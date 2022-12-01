from django.contrib import admin
from .models import Message, Post, Profile, Comment, Room

# Register your models here.
admin.site.register(Post)
admin.site.register(Profile)
admin.site.register(Comment)
admin.site.register(Message)
admin.site.register(Room)
