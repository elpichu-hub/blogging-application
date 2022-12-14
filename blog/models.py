from datetime import datetime
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator



class Post(models.Model):
    content = models.CharField(max_length=1000)
    posted_date = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, blank=True, related_name='post_likes')
    dislikes = models.ManyToManyField(
        User, blank=True, related_name='post_dislikes')
    author = models.ForeignKey(
        User, related_name='posts', on_delete=models.CASCADE, default=1)

    # On django admin this format will show on each Post.
    def __str__(self):
        return f'Post id: {self.id} {self.content}. Created by {self.author.username} on {self.posted_date}'

# User will have a profile, it will be created through a
# Signal once a user gets created.


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default.jpg', upload_to='profile_pics')
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True) # Validators should be a list
    profession = models.CharField(max_length=50, default='Add a Profesion')

    def __repr__(self):
        return f'{self.user.username} Profile'

    def __str__(self):
        return f'{self.user.username} Profile {self.id}'


class Comment(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments')
    body = models.TextField()
    author = models.ForeignKey(
        User, related_name='comments', on_delete=models.CASCADE, default=1)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_on']

    def __str__(self):
        return f'{self.body}, {self.id}'

    def __repr__(self):
        return f'{self.body} {self.id}'


class Room(models.Model):
    room_name = models.CharField(max_length=100)
    members = models.ManyToManyField(User, related_name='members')
    
    def __str__(self):
        return f'{self.room_name} id={self.id}'

class Message(models.Model):
    to_user = models.CharField(max_length=100)
    message_text = models.CharField(max_length=500)
    sent_datetime = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User, related_name='messages', on_delete=models.CASCADE, blank=True)
    room_name = models.CharField(max_length=100, blank=True)
    room = models.ForeignKey(Room, related_name='room_messages', on_delete=models.CASCADE, blank=True)
    
    def last_50_messages_by_room_name(self, room_name):
        room_obj = Room.objects.filter(room_name=room_name)[0]
        print(room_obj)
        return Message.objects.filter(room=room_obj).order_by('sent_datetime')[:50]



