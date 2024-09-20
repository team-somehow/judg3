from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from app.models import Project, ProjectMatchup, Event
import numpy as np
from django.shortcuts import get_object_or_404


class LeaderboardInputSerializer(serializers.Serializer):
    event = serializers.IntegerField(required=True)


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'photo', 'url', 'created_at']


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_leaderboard(request):
    serializer = LeaderboardInputSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    validated_data = serializer.validated_data
    event = get_object_or_404(Event, pk=validated_data['event'])

    # Get all projects related to this event
    projects = Project.objects.filter(event=event)

    # Get all matchups related to this event
    matchups = ProjectMatchup.objects.filter(event=event)

    # Initialize project scores
    project_scores = {project.id: 1.0 for project in projects}

    # for matchup in matchups:
    #     print(matchup.project1.id, matchup.project2.id, matchup.project1_wins, matchup.project2_wins)
    # Iteratively update project scores based on Bradley-Terry Model
    for _ in range(100):  # Iterate for 100 rounds to converge scores
        for project in projects:
            project_id = project.id
            sum_num = 0.0
            sum_den = 0.0

            for matchup in matchups:
                if matchup.project1.id == project_id:
                    opponent_id = matchup.project2.id
                    opponent_score = project_scores[opponent_id]
                    wins = matchup.project1_wins
                    losses = matchup.project2_wins
                elif matchup.project2.id == project_id:
                    opponent_id = matchup.project1.id
                    opponent_score = project_scores[opponent_id]
                    wins = matchup.project2_wins
                    losses = matchup.project1_wins
                else:
                    continue  # Skip if the project isn't part of this matchup

                # Bradley-Terry Formula (Equation 5)
                p_i = project_scores[project_id]

                if (p_i + opponent_score) == 0:
                    continue

                sum_num += wins * (opponent_score / (p_i + opponent_score))
                sum_den += losses / (p_i + opponent_score)

            # print(project_id, sum_num, sum_den)

            # Update project score
            if sum_den > 0 and sum_num > 0:
                project_scores[project_id] = sum_num / sum_den

        # Normalize the scores (use geometric mean normalization)
        geometric_mean = np.prod(
            list(project_scores.values())) ** (1 / len(projects))

        if geometric_mean > 0:
            project_scores = {
                pid: score / geometric_mean for pid, score in project_scores.items()}

    temp_leaderboard = []
    for project in projects:
        temp_leaderboard.append({
            "project": ProjectSerializer(project).data,
            "score": project_scores[project.id]
        })

    # Sort leaderboard by scores in descending order
    temp_leaderboard.sort(key=lambda p: p['score'], reverse=True)

    return Response(temp_leaderboard, status=status.HTTP_200_OK)
