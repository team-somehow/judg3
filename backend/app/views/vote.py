from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import Vote, Event, Project, Application, ProjectMatchup
from rest_framework import serializers
from django.shortcuts import get_object_or_404


class VoteInputSerializer(serializers.Serializer):
    event = serializers.IntegerField(required=True)
    project1 = serializers.IntegerField(required=True)
    project2 = serializers.IntegerField(required=True)
    winner = serializers.IntegerField(required=True)


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['id', 'event', 'project1', 'project2', 'winner', 'voter']


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_vote(request):
    serializer = VoteInputSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    validated_data = serializer.validated_data

    # Retrieve event and projects using get_object_or_404 for better error handling
    event = get_object_or_404(Event, pk=validated_data['event'])
    project1 = get_object_or_404(Project, pk=validated_data['project1'])
    project2 = get_object_or_404(Project, pk=validated_data['project2'])
    winner = get_object_or_404(Project, pk=validated_data['winner'])

    # Ensure all projects belong to the same event
    if project1.event != event or project2.event != event or winner.event != event:
        return Response({"error": "All projects must belong to the same event."}, status=status.HTTP_400_BAD_REQUEST)

    # Ensure the winner is either project1 or project2
    if winner not in [project1, project2]:
        return Response({"error": "Winner must be either project1 or project2."}, status=status.HTTP_400_BAD_REQUEST)

    # Ensure the voter is an accepted voter for the event
    try:
        application = Application.objects.get(
            user=request.user, event=event, status='Accepted')
    except Application.DoesNotExist:
        return Response({"error": "You must be an accepted voter for the event."}, status=status.HTTP_400_BAD_REQUEST)

    # Create the vote
    vote = Vote.objects.create(
        voter=request.user,
        event=event,
        project1=project1,
        project2=project2,
        winner=winner
    )

    # Find or create the ProjectMatchup for project1 and project2
    matchup, created = ProjectMatchup.objects.get_or_create(
        event=event,
        project1=project1,
        project2=project2
    )

    # Update the win count for the correct project
    if winner == project1:
        matchup.project1_wins += 1
    elif winner == project2:
        matchup.project2_wins += 1

    # Save the updated matchup
    matchup.save()

    # Serialize and return the created vote
    vote_serializer = VoteSerializer(vote)
    return Response(vote_serializer.data, status=status.HTTP_201_CREATED)
