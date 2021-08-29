from rest_framework import serializers
from .models import Gallery, GalleryPicture

class GallerySerializer(serializers.ModelSerializer):
    base_url = serializers.SerializerMethodField()
    image_count = serializers.SerializerMethodField()

    def get_base_url(self, obj):
        return obj.base_url()

    def get_image_count(self, obj):
        return obj.pictures.all().count()

    class Meta:
        model = Gallery
        fields = ('id', 'name', 'image_count', 'created', 'updated', 'base_url', )
        read_only_fields = ('id', 'image_count', 'created', 'updated', 'base_url', )


class GalleryPictureSerializer(serializers.ModelSerializer):
    path = serializers.SerializerMethodField()
    thumbnail_path = serializers.SerializerMethodField()

    def get_path(self, obj):
        return obj.path()

    def get_thumbnail_path(self, obj):
        return obj.thumbnail_path()

    class Meta:
        model = GalleryPicture
        fields = ('id', 'file_name', 'path', 'thumbnail_path', 'gallery', 'created', 'updated',)
