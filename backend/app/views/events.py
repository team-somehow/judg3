from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from app.models import Event, Application


class EventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'photo']

    def create(self, validated_data):
        # Ensure the creator is set manually in the view
        return Event.objects.create(**validated_data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    serializer = EventCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(creator=request.user)
        return Response({'message': 'Event created successfully.'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_events_noauth(request):
    events = Event.objects.all()
    serializer = EventCreateSerializer(
        events, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_events_with_status(request):
    user = request.user  # Get the authenticated user
    events = Event.objects.all()  # Get all events

    events_data = []

    for event in events:
        # Check if the user has applied to this event
        is_applied = Application.objects.filter(
            user=user, event=event).exists()
        status1 = "applied" if is_applied else "not_applied"

        # Serialize the event
        event_serializer = EventCreateSerializer(event)
        event_data = event_serializer.data
        event_data['status'] = status1  # Add the application status

        events_data.append(event_data)

    return Response(events_data, status=status.HTTP_200_OK)
