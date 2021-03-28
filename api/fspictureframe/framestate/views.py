from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import FrameState
from .serializers import FrameStateSerializer
# Create your views here.

class FrameStateViewSet(viewsets.ModelViewSet):
    """
    Creates user accounts
    """
    queryset = FrameState.objects.all()
    serializer_class = FrameStateSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'frame__username'