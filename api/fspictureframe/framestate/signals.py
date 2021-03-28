from django.dispatch import receiver
from django.db.models.signals import post_save

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from fspictureframe.users.models import User
from .models import FrameState

@receiver(post_save, sender=FrameState)
def frame_state_saved(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    print("Updating FS")
    async_to_sync(channel_layer.group_send)('frame_state', {
        'type': 'framestate.crud',
        'data': {
            'model': 'FrameState',
            'view': instance.view,
            'id': instance.id,
            'frame_id': instance.frame_id
        }
    })
