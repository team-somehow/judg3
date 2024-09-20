from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import Event, Application
from rest_framework import serializers


class ApplySerializer(serializers.Serializer):
    event_id = serializers.IntegerField()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_event(request):
    user = request.user
    serializer = ApplySerializer(data=request.data)

    if serializer.is_valid():
        event_id = serializer.validated_data['event_id']

        # Check if the event exists
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user has already applied for this event
        application, created = Application.objects.get_or_create(
            user=user, event=event)

        if created:
            # New application created, status will be 'Pending'
            return Response({"status": "Pending"}, status=status.HTTP_201_CREATED)
        else:
            # If the application already exists, return its current status
            return Response({"status": application.status}, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def apply_status(request, event_id):
    user = request.user

    # Check if the event exists
    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    # Check if the user has applied for this event
    try:
        application = Application.objects.get(user=user, event=event)
        return Response({"status": application.status}, status=status.HTTP_200_OK)
    except Application.DoesNotExist:
        return Response({"status": "not_applied"}, status=status.HTTP_200_OK)
