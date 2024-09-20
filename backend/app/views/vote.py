from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from app.models import Vote, Event, Project

class VoteInputSerializer(serializers.Serializer):
    event = serializers.CharField(required=True)
    project1 = serializers.CharField(required=True)
    project2 = serializers.CharField(required=True)
    winner = serializers.CharField(required=True)

class VoteSerializer(serializers.Serializer):
    class Meta:
        model = Vote
        fields = ['id', 'event', 'project1', 'project2', 'winner']

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_vote(request):
    serializer = VoteInputSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        validated_data = serializer.validated_data
        event = Event.objects.get(pk=validated_data['event'])
        project1 = Project.objects.get(pk=validated_data['project1'])
        project2 = Project.objects.get(pk=validated_data['project2'])
        winner = Project.objects.get(pk=validated_data['winner'])

        vote = Vote.objects.create(
            vote = request.user,
            event = event,
            project1 = project1,
            project2 = project2,
            winner = winner
        )

        vote.save()

        serialized_vote = VoteSerializer(vote)
        Response(serialized_vote.data, status=status.HTTP_201_CREATED)





