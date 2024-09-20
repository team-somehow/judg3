from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import Application, Event


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_voters(request, event_id):
    user = request.user  # Authenticated user

    # Check if the event exists
    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    # Check if the authenticated user is the creator of the event
    if event.creator != user:
        return Response({"error": "You do not have permission to view this event's voters."}, status=status.HTTP_403_FORBIDDEN)

    # Get all applications (voters) for the event
    applications = Application.objects.filter(event=event)

    # Prepare the voter data with voter_id and status
    voters_data = [{"voter_id": application.user.id,
                    "status": application.status} for application in applications]

    return Response(voters_data, status=status.HTTP_200_OK)
