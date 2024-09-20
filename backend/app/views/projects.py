from app.models import Project
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import Project, Event
from rest_framework import serializers
from app.models import Project, Event


class ProjectCreateSerializer(serializers.ModelSerializer):
    # Accept event_id from the request
    event_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Project
        fields = ['name', 'description', 'url', 'photo', 'event_id']

    def create(self, validated_data):
        # Get the event from the event_id and remove event_id from validated_data
        event = Event.objects.get(id=validated_data.pop('event_id'))

        # Create the project with the event and the owner (authenticated user)
        project = Project.objects.create(event=event, **validated_data)
        return project


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_project(request):
    serializer = ProjectCreateSerializer(data=request.data)

    if serializer.is_valid():
        # Set the authenticated user as the owner
        serializer.save(owner=request.user)
        return Response({"project_id": serializer.instance.id}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['photo', 'url', 'name', 'description']


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_project(request, id):
    # Try to get the project by its ID
    try:
        project = Project.objects.get(id=id)
    except Project.DoesNotExist:
        return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the project and return the details
    serializer = ProjectDetailSerializer(project)
    return Response(serializer.data, status=status.HTTP_200_OK)
