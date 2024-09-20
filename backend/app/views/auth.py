from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
import requests
from django.conf import settings
from ..models import User
import logging

logger = logging.getLogger(__name__)


class WorldIDInputSerializer(serializers.Serializer):
    nullifier_hash = serializers.CharField(required=True)
    proof = serializers.CharField(required=True)
    merkle_root = serializers.CharField(required=True)
    verification_level = serializers.CharField(required=True)
    action = serializers.CharField(required=True)
    signal_hash = serializers.CharField(required=False)


@api_view(['POST'])
def verify_world_id(request):
    serializer = WorldIDInputSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    try:
        validated_data = serializer.validated_data
        nullifier_hash = validated_data['nullifier_hash']
        proof = validated_data['proof']
        merkle_root = validated_data['merkle_root']
        verification_level = validated_data['verification_level']
        action = validated_data['action']

        user, created = User.objects.get_or_create(
            world_id_user_hash=nullifier_hash)
        if user.is_verified:

            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)

        app_id = settings.APP_ID

        verify_url = f'https://developer.worldcoin.org/api/v2/verify/{app_id}'
        response = requests.post(verify_url, json={
            'nullifier_hash': nullifier_hash,
            'proof': proof,
            'merkle_root': merkle_root,
            'verification_level': verification_level,
            'action': action,
        })

        if response.status_code == 200:
            data = response.json()
            if data['success']:

                user.is_verified = True
                user.save()

                token, _ = Token.objects.get_or_create(user=user)

                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'error': "Verification failed."}, status=status.HTTP_400_BAD_REQUEST)
        elif response.status_code == 400 and response.json().get('code') == 'max_verifications_reached':

            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:

            return Response({'error': response.json().get('message', 'Error contacting World ID API.')},
                            status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        logger.error(f"Error verifying World ID: {e}")
        return Response({'error': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
