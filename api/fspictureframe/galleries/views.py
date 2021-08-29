from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Gallery, GalleryPicture
from .serializers import GallerySerializer, GalleryPictureSerializer
# Create your views here.


class GalleryViewSet(viewsets.ModelViewSet):
    """
    Manages galleries
    """
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = None

    @action(detail=True, methods=['get'])
    def pictures(self, request, pk=None):
        gallery = self.get_object()
        pictures = gallery.pictures.all()
        serializer = GalleryPictureSerializer(pictures, many=True)
        return Response({
            'pictures': serializer.data
        })


class GalleryPictureViewSet(viewsets.ModelViewSet):
    """
    Manages Gallery Pictures
    """
    queryset = GalleryPicture.objects.all()
    serializer_class = GalleryPictureSerializer
    permission_classes = (IsAuthenticated,)
