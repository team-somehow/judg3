from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from app.models import Project, ProjectMatchup, Event
import numpy as np
import jsonify

class LeaderboardInputSerializer(serializers.Serializer):
    event = serializers.CharField(required=True)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_leaderboard(request):
    serializer = LeaderboardInputSerializer(request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        validated_data = serializer.validated_data
        event = Event.objects.get(pk=validated_data['event'])
        projects = Project.objects.get(event=event)
        matchups = ProjectMatchup.objects.get(event=event)
        project_scores = {project.id: 1.0 for project in projects} 

        for _ in range(100):  
            for project in projects:
                project_id = project.id
                sum_num = 0
                sum_den = 0

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
                    sum_num += wins * (opponent_score / (p_i + opponent_score))
                    sum_den += losses / (p_i + opponent_score)

                # Update project score
                if sum_den > 0:
                    project_scores[project_id] = sum_num / sum_den

            # Normalize the scores (use geometric mean normalization)
            geometric_mean = np.prod(list(project_scores.values())) ** (1 / len(projects))

            if(geometric_mean > 0):
                project_scores = {pid: score / geometric_mean for pid, score in project_scores.items()}

        # Prepare leaderboard response with project names and scores
        temp_leaderboard = []
        for project in projects:
            temp_leaderboard.append({
                "data": project,
                "score": project_scores[project.id]
            })

        temp_leaderboard.sort(key=lambda p: p['score'], reverse=True)

        finalLeaderboard = []

        for project in temp_leaderboard:
            finalLeaderboard.append(project['data'])

        return Response(finalLeaderboard, status=status.HTTP_200_OK)





