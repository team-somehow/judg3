import random
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from app.models import Project, ProjectMatchup, UserPairing, Event, Vote
from django.db.models import Q
from django.shortcuts import get_object_or_404
import numpy as np

EPSILON = 0.2  # Greedy epsilon


def calculate_information_gain(base_project, project):
    """Calculate the information gain between two projects."""
    project_matchup = ProjectMatchup.objects.filter(
        Q(project1=base_project, project2=project) |
        Q(project1=project, project2=base_project)
    ).values('project1_wins', 'project2_wins').first()

    if not project_matchup:
        return 0.5  # Default information gain if no data exists

    project1_wins = project_matchup.get('project1_wins', 0)
    project2_wins = project_matchup.get('project2_wins', 0)

    total_matches = project1_wins + project2_wins
    if total_matches == 0:
        return 0.5  # No information if no matchups

    p1 = project1_wins / total_matches
    p2 = project2_wins / total_matches

    if p1 == 0 or p2 == 0:
        return 0

    entropy_before = -(p1 * np.log2(p1) + p2 * np.log2(p2))
    entropy_after = -(p1 * np.log2(p1) + (1 - p1) * np.log2(1 - p1))

    return entropy_before - entropy_after


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def suggest(request, event_id):
    user = request.user
    event = get_object_or_404(Event, pk=event_id)

    # Get all projects for the event
    all_projects = Project.objects.filter(event=event)

    # Get the total number of votes already cast by the user for this event
    curr_vote_count = Vote.objects.filter(voter=user, event=event).count()
    total_available_vote_count = all_projects.count() - 1  # Total votes possible, minus 1 for comparison

    # Get the base project (null if first recommendation)
    base_project_id = request.GET.get('base_project_id')
    base_project = None if base_project_id is None else get_object_or_404(Project, pk=base_project_id)

    # If it's the first recommendation, randomly choose two projects
    if base_project is None:
        if all_projects.count() < 2:
            return Response({"error": "Not enough projects available for comparison"}, status=400)

        left_proj, right_proj = random.sample(list(all_projects), 2)
    else:
        # Get all other projects except the base project
        other_projects = Project.objects.filter(event=event).exclude(id=base_project.id)

        # Filter out the projects already paired for this user
        already_paired_projects = UserPairing.objects.filter(
            Q(project1=base_project) | Q(project2=base_project),
            user=user,
            event=event
        ).values_list('project1', 'project2')

        already_paired_project_ids = set([proj_id for pair in already_paired_projects for proj_id in pair])

        suggested_projects = [proj for proj in other_projects if proj.id not in already_paired_project_ids]

        if not suggested_projects:
            return Response({"error": "No new pairings available for the user"}, status=404)

        # Implement Greedy Epsilon strategy
        if random.random() < EPSILON:
            right_proj = random.choice(suggested_projects)
        else:
            right_proj = max(
                suggested_projects,
                key=lambda proj: calculate_information_gain(base_project, proj)
            )

        left_proj = base_project

    # Record the pairing as suggested to the user
    new_pairing = UserPairing(
        user=user,
        event=event,
        project1=left_proj if left_proj.id < right_proj.id else right_proj,
        project2=right_proj if left_proj.id < right_proj.id else left_proj
    )

    new_pairing.save()

    return Response({
        "left_proj_id": left_proj.id,
        "right_proj_id": right_proj.id,
        "total_available_vote_count": total_available_vote_count,
        "curr_vote_count": curr_vote_count
    }, status=200)
