from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from app.models import Project, ProjectMatchup, Event
from django.shortcuts import get_object_or_404

class MatrixInputSerializer(serializers.Serializer):
    event = serializers.IntegerField(required=True)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_matrix(request):
    serializer = MatrixInputSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    validated_data = serializer.validated_data
    event = get_object_or_404(Event, pk=validated_data['event'])

    # Fetch all projects for the event
    projects = Project.objects.filter(event=event)
    num_projects = len(projects)

    # Map projects to an index (0 to n-1)
    project_to_index = {project.id: idx for idx, project in enumerate(projects)}

    # Initialize an n x n matrix with 0.0
    matrix = [[0.0] * num_projects for _ in range(num_projects)]

    # Fetch all matchups for the event
    matchups = ProjectMatchup.objects.filter(event=event)

    # Fill in the matrix with wins
    for matchup in matchups:
        winner_index = project_to_index[matchup.winner.id]
        loser_index = project_to_index[matchup.loser.id]
        # Increment the win count for the winner over the loser
        matrix[winner_index][loser_index] += 1

    return Response(matrix, status=status.HTTP_200_OK)