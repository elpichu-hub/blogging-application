from datetime import datetime
import json
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import User
from .models import Room, Message
from asgiref.sync import async_to_sync
# from asgiref.sync import sync_to_async


class ChatConsumer(WebsocketConsumer):

    # fetch messages from database using method from the model and
    # getting messages for the specific room.
    # content is defined to give a command to receive() method so it knows what
    # to execute.
    def fetch_messages(self, data):
        room_name = self.scope['url_route']['kwargs']['room_name']
        messages = Message.last_50_messages_by_room_name(self, room_name)
        content = {
            'messages': self.messages_to_json(messages),
            'command': 'fetch_messages',
        }
        print(content)
        self.send_message(content)

    def new_message(self, data):
        print('new message ran')
        room_name = self.scope['url_route']['kwargs']['room_name']     # try and pass to url the user sending the text

        user_logged_in_id = self.scope['url_route']['kwargs']['user_logged_in_id']
        user_receiving_id = self.scope['url_route']['kwargs']['user_receiving']

        user_sending = User.objects.get(pk=user_logged_in_id)
        user_receiving = User.objects.get(pk=user_receiving_id)


        room = Room.objects.filter(room_name=room_name).first()
        print(room)
        if room:
            message = Message.objects.create(
                to_user=user_receiving.username,
                message_text=data['message'],
                sent_datetime=datetime.now(),
                user=user_sending,
                # from_user=user_sending.id,
                room_name=room_name,
                room=room,
            )
        else:
            new_room = Room.objects.create(room_name=room_name)
            message = Message.objects.create(
                to_user=user_receiving.username,
                message_text=data['message'],
                sent_datetime=datetime.now(),
                user=user_sending,
                # from_user=user_sending.id,
                room_name=new_room,
                room=new_room,
            )

        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        return self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        print(message)
        return {
            'user': message.user.username,
            'user_id': message.user.id,
            'user_profile': message.user.profile.image.url,
            'from_user': message.user.username,
            'to_user': message.to_user,
            'sent_datetime': str(message.sent_datetime),
            'room': int(message.room.id),
            'message_text': message.message_text,
            
        }


    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message,
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name,
        )

        self.accept()

        try:
            self.fetch_messages(self)
        except:
            print('nothing to fetch')

    def disconnect(self, close_code):
        print('disconnected')
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.new_message(data)
        # self.commands[data['command']](self, data)                       # This line will get the value from commands dict, the command will be passed
        # passed from room.html in the sockets send method. the value
        # is a function (self, data) is the parameter the function takes.

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))
