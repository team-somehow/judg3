from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from rest_framework import serializers
from app.models import Event

from rest_framework import serializers
from .models import Application, Event

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['event', 'status']

    def validate_event(self, value):
        # Ensure that the event exists
        if not Event.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Event not found.")
        return value

    def create(self, validated_data):
        # Get the user from the request context
        user = self.context['request'].user
        event = validated_data['event']

        # Check if the user has already applied to this event
        if Application.objects.filter(user=user, event=event).exists():
            raise serializers.ValidationError("You have already applied for this event.")

        # Create the application with a status of 'Pending'
        application = Application.objects.create(user=user, event=event, status='Pending')
        return application