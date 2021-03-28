from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

# Create your models here.

class FrameState(models.Model):
    PICTURES = 'P'
    CALENDAR = 'C'
    RECIPES = 'R'
    VIDEOS = 'V'
    
    VIEW_CHOICES = [
        (PICTURES, 'Pictures'),
        (CALENDAR, 'Calendar'),
        (RECIPES, 'Recipes'),
        (VIDEOS, 'Videos'),
    ]

    frame = models.ForeignKey('users.User', on_delete=models.CASCADE)
    view = models.CharField(max_length=2, choices=VIEW_CHOICES, default=PICTURES)
    gallery = models.ForeignKey(
        'galleries.Gallery',
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )

@receiver(post_save, sender=FrameState)
def frame_state_saved(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)('framestates', {
        'type': 'fs.crud',
        'data': {
            'model': 'FrameState',
            'view': instance.view,
            'id': str(instance.id),
            'frame_id': str(instance.frame_id),
            'gallery': instance.gallery_id
        }
    })

