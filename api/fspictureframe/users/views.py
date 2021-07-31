from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import User
from .permissions import IsUserOrReadOnly
from .serializers import CreateUserSerializer, UserSerializer, CreateFrameSerializer


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


class CreateFrameViewSet(mixins.CreateModelMixin,
                         viewsets.GenericViewSet):
    """
    Creates frame accounts
    """
    queryset = User.objects.all()
    serializer_class = CreateFrameSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'username'

    @method_decorator(csrf_exempt)
    def create(self, request, *args, **kwargs):
        return super(CreateFrameViewSet, self).create(request, *args, **kwargs)

    @action(detail=True, methods=['patch'])
    def activate(self, request, username=None):
        print("Activate!")
        frame = self.get_object()
        data = request.data
        frame.frame_location = data['frame_location']
        frame.active = True
        frame.save()
        serializer = CreateFrameSerializer(frame)

        return Response(serializer.data)


class UserCreateViewSet(mixins.CreateModelMixin,
                        viewsets.GenericViewSet):
    """
    Creates user accounts
    """
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = (AllowAny,)

