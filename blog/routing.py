from django.urls import re_path, path

from . import consumers

websocket_urlpatterns = [
    # re_path(r'ws/chat/', consumers.ChatConsumer.as_asgi()),
    path('ws/chat/<room_name>/<user_logged_in_id>/<user_receiving>', consumers.ChatConsumer.as_asgi(), name='chat')
]