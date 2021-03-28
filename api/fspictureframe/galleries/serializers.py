from rest_framework import serializers
from .models import Gallery, GalleryPicture

class GallerySerializer(serializers.ModelSerializer):
    base_url = serializers.SerializerMethodField()

    def get_base_url(self, obj):
        return obj.base_url()

    class Meta:
        model = Gallery
        fields = ('id', 'name', 'created', 'updated', 'base_url', )
        read_only_fields = ('id', 'created', 'updated', 'base_url', )


class GalleryPictureSerializer(serializers.ModelSerializer):
    path = serializers.SerializerMethodField()

    def get_path(self, obj):
        return obj.path()

    class Meta:
        model = GalleryPicture
        fields = ('id', 'file_name', 'path', 'gallery', 'created', 'updated',)