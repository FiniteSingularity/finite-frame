from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import User
from .permissions import IsUserOrReadOnly
from .serializers import CreateUserSerializer, FrameSerializer, UserSerializer


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    """
    Updates and retrieves user accounts
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsUserOrReadOnly,)


class FrameViewSet(viewsets.ModelViewSet):
    """
    Creates frame accounts
    """
    queryset = User.objects.filter(user_type='F')
    serializer_class = FrameSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'username'
    pagination_class = None

    @method_decorator(csrf_exempt)
    def create(self, request, *args, **kwargs):
        return super(FrameViewSet, self).create(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        frames = User.objects.filter(active=True, user_type='F')
        page = self.paginate_queryset(frames)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(frames, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'])
    def activate(self, request, username=None):
        print("Activate!")
        frame = self.get_object()
        data = request.data
        frame.frame_location = data['frame_location']
        frame.active = True
        frame.save()
        serializer = FrameSerializer(frame)

        return Response(serializer.data)


class UserCreateViewSet(mixins.CreateModelMixin,
                        viewsets.GenericViewSet):
    """
    Creates user accounts
    """
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = (AllowAny,)

