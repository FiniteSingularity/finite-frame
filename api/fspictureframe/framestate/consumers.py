from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async

from fspictureframe.users.models import User

import json

from rest_framework.authtoken.models import Token

class FrameStateConsumer(AsyncJsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        # Define the group_name 'widgets' which this Consumer will attach to.
        self.group_name = 'framestates'
        super().__init__(*args, **kwargs)

    async def connect(self):
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        # Remove this Consumer/Channel from the group `self.group_name` on disconnect
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None, **kwargs):
        data = json.loads(text_data)
        if "token" not in data:
            print("disconnecting- no token")
            await self.channel_layer.group_discard(self.group_name, self.channel_name)
            await self.close(code=4401)
            return
        # authenticate with token
        token_str = data["token"]
        token = await database_sync_to_async(Token.objects.get)(key=token_str)
        user = await database_sync_to_async(User.objects.get)(pk=token.user_id)
        self.scope["user"] = user
        return


    # CRUD event handler.  Accessed from send commands via widget.crud
    async def fs_crud(self, event):
        if self.scope["user"].is_anonymous:
            await self.channel_layer.group_discard(self.group_name, self.channel_name)
            await self.close(code=4401)
            return
        event_frame_id = event['data']['frame_id']
        if event_frame_id != str(self.scope["user"].id):
            return
        # Send the entire data dict from the event.  send_json automatically
        # encodes any dicts it is passed as json data.
        await self.send_json(event['data'])

    async def fs_refresh(self, event):
        if self.scope["user"].is_anonymous:
            await self.channel_layer.group_discard(self.group_name, self.channel_name)
            await self.close(code=4401)
            return
        