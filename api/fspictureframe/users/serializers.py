import string
import random
import traceback

from rest_framework import serializers

from fspictureframe.framestate.serializers import FrameStateSerializer
from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'user_type', 'frame_location')
        read_only_fields = ('username', )



class FrameSerializer(serializers.ModelSerializer):
    state = FrameStateSerializer(many=False, read_only=True)
    def create(self, validated_data):
        ModelClass = self.Meta.model

        username = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        data = {
            'username': username,
            'user_type': 'F'
        }
        try:
            instance = ModelClass._default_manager.create(**data)
        except TypeError:
            tb = traceback.format_exc()
            msg = (
                'Got a `TypeError` when calling `%s.%s.create()`. '
                'This may be because you have a writable field on the '
                'serializer class that is not a valid argument to '
                '`%s.%s.create()`. You may need to make the field '
                'read-only, or override the %s.create() method to handle '
                'this correctly.\nOriginal exception was:\n %s' %
                (
                    ModelClass.__name__,
                    ModelClass._default_manager.name,
                    ModelClass.__name__,
                    ModelClass._default_manager.name,
                    self.__class__.__name__,
                    tb
                )
            )
            raise TypeError(msg)
        instance.set_password(username)

        return instance


    class Meta:
        model = User
        fields = ['id', 'username', 'active', 'frame_location', 'state',]
        read_only_fields = ['id', 'username', 'state']


class CreateUserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        # call create_user on user object. Without this
        # the password will be stored in plain text.
        user = User.objects.create_user(**validated_data)
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email', 'auth_token',)
        read_only_fields = ('auth_token',)
        extra_kwargs = {'password': {'write_only': True}}
