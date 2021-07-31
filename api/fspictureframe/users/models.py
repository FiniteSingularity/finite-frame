import uuid
from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

from fspictureframe.framestate.models import FrameState
from fspictureframe.galleries.models import Gallery

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class User(AbstractUser):
    PERSON = 'P'
    FRAME = 'F'
    USER_TYPE_CHOICES = [
        (PERSON, 'Person'),
        (FRAME, 'Frame')
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_type = models.CharField(max_length=1, choices=USER_TYPE_CHOICES, default=PERSON)
    frame_location = models.CharField(max_length=32, null=True, blank=True)
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.username


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def frame_saved(sender, instance, created, **kwargs):
    if instance.user_type == 'P':
        return
    
    if created:
        fs = FrameState.objects.create(frame=instance)
        print('creating framestate')
        galleries = Gallery.objects.all()
        if galleries.count() > 0:
            fs.gallery = galleries.first()
            fs.save()

    token = Token.objects.get(user=instance)

    channel_layer = get_channel_layer()
    if created:
        action = 'CREATED'
    else:
        action = 'UPDATED'
    print('sending frame info...')
    async_to_sync(channel_layer.group_send)('frames', {
        'type': 'frame.auth',
        'data': {
            'model': 'User',
            'id': str(instance.id),
            'action': action,
            'frame_location': instance.frame_location,
            'token': str(token)
        }
    })
