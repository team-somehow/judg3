from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from app.models import Application, Event, User

from rest_framework import serializers


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

    # Prepare the voter data with voter_id, status, and user_address
    voters_data = [{"voter_id": application.user.id,
                    "status": application.status,
                    "user_address": application.user.user_address} for application in applications]

    return Response(voters_data, status=status.HTTP_200_OK)


class UpdateVoterStatusSerializer(serializers.Serializer):
    event_id = serializers.IntegerField()
    voter_id = serializers.IntegerField()
    status = serializers.ChoiceField(choices=['Accepted', 'Rejected'])


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_voter_status(request):
    # The authenticated user (who may be the event creator)
    user = request.user
    serializer = UpdateVoterStatusSerializer(data=request.data)

    if serializer.is_valid():
        event_id = serializer.validated_data['event_id']
        voter_id = serializer.validated_data['voter_id']
        chosen_status = serializer.validated_data['status']

        # Check if the event exists
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if the authenticated user is the creator of the event
        if event.creator != user:
            return Response({"error": "You do not have permission to update this voter's status."}, status=status.HTTP_403_FORBIDDEN)

        # Check if the voter (user) exists
        try:
            voter = User.objects.get(id=voter_id)
        except User.DoesNotExist:
            return Response({"error": "Voter not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if the voter has applied to this event
        try:
            application = Application.objects.get(user=voter, event=event)
        except Application.DoesNotExist:
            return Response({"error": "Application not found."}, status=status.HTTP_404_NOT_FOUND)

        # Update the voter's status
        application.status = chosen_status
        application.save()

        return Response({"status": application.status}, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
