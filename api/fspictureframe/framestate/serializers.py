from rest_framework import serializers
from .models import FrameState
from fspictureframe.galleries.models import Gallery

class FrameStateSerializer(serializers.ModelSerializer):

    class Meta:
        model = FrameState
        fields = ('id', 'frame', 'view', 'gallery', )
        read_only_fields = ('id', )

    def create(self, validated_data):
        instance = super(FrameStateSerializer, self).create(validated_data)
        galleries = Gallery.objects.all()
        if galleries.exists():
            instance.gallery = galleries.first()
        return instance
