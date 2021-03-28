from django.conf.urls import url

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from fspictureframe.users.consumers import FrameJsonConsumer
from fspictureframe.framestate.consumers import FrameStateConsumer

application = ProtocolTypeRouter({
    # Empty for now (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter([
            url(r'^ws/frames/state/$', FrameStateConsumer),
            url(r'^ws/frames/$', FrameJsonConsumer),
        ])
    ),
})