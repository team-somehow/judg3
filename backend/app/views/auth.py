from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
import requests
from django.conf import settings
from ..models import User
import logging

logger = logging.getLogger(__name__)


class WorldIDInputSerializer(serializers.Serializer):
    proof = serializers.JSONField(required=True)


class UserVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['world_id_user_hash', 'is_verified']


@api_view(['POST'])
def verify_world_id(request):
    serializer = WorldIDInputSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    try:
        validated_data = serializer.validated_data
        proof = validated_data['proof']
        app_id = settings.APP_ID
        action = settings.ACTION_ID

        verify_url = 'https://developer.worldcoin.org/api/verify'
        response = requests.post(verify_url, json={
            'proof': proof,
            'app_id': app_id,
            'action_id': action
        })

        if response.status_code == 200:
            data = response.json()
            if data['success']:
                world_id_user_hash = data['world_id_user_hash']

                user, created = User.objects.get_or_create(
                    world_id_user_hash=world_id_user_hash)

                user.is_verified = True
                user.save()

                token, created = Token.objects.get_or_create(user=user)

                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'error': "Verification failed."}, status=HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': "Error contacting World ID API."}, status=HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        logger.error(f"Error verifying World ID: {e}")
        return Response({'error': 'An unexpected error occurred.'}, status=HTTP_400_BAD_REQUEST)
