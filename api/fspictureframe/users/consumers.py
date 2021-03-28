from channels.generic.websocket import AsyncJsonWebsocketConsumer, AsyncWebsocketConsumer

class FrameJsonConsumer(AsyncJsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        # Define the group_name 'frames' which this Consumer will attach to.
        self.group_name = 'frames'
        super().__init__(*args, **kwargs)

    async def connect(self):
        # Add this Consumer/Channel to the group `self.group_name`
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        # Remove this Consumer/Channel from the group `self.group_name` on disconnect
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None, **kwargs):
        pass

    # auth event handler.  Accessed from send commands via frame.auth
    async def frame_auth(self, event):
        # Send the entire data dict from the event.  send_json automatically
        # encodes any dicts it is passed as json data.
        await self.send_json(event['data'])