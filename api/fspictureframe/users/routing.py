from django.urls import re_path
from .consumers import FrameJsonConsumer

# from . import consumers

websocket_urlpatterns = [
    # Basic json and text consumers- no user auth required.
    re_path(r'ws/frames/json/$', FrameJsonConsumer),
]