from django.shortcuts import HttpResponse
from .serializer import (
    MessageSerializer, PostSerializer,
    UserSerializer, CommentSerializer,
    ProfileSerializer
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from .models import Message, Post, Comment, Profile, Room
from django.contrib.auth.models import User
from .pagination import UsersSuggestionPaginatin, MessagesPagination
from .serializer import MyTokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from rest_framework import filters


# # This was intened to be used with fetch but
# # to get the messages i'm using websockets.
# class MessageListAPIView(generics.ListAPIView):
#     permission_classes = (IsAuthenticated, )
#     serializer_class = MessageSerializer
#     pagination_class = MessagesPagination

#     def get_queryset(self):
#         room_for_chat = Room.objects.filter(
#             room_name=self.kwargs['room_id']).first()
#         return Message.objects.filter(room=room_for_chat).all()


class MessageCreateAPIView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = MessageSerializer

    # this method will get to_user, message_text & room_name
    # from the frontend. The rest of the fields for the Message
    # model will be created in this method: room, room_name,
    # user
    def perform_create(self, serializer):
        room_name = serializer.validated_data['room_name']
        room_id = Room.objects.filter(room_name=room_name).first()

        # if the room exists already then create the
        # new message on that room.
        if room_id:
            serializer.save(
                to_user=serializer.validated_data['to_user'],
                message_text=serializer.validated_data['message_text'],
                user=self.request.user,
                room_name=room_name,
                room=room_id
            )
        # if the room does not exists create a new one.
        else:
            print('non existent room so created new one.')
            new_room = Room.objects.create(room_name=room_name)
            serializer.save(
                # from_user=self.request.user,
                to_user=serializer.validated_data['to_user'],
                message_text=serializer.validated_data['message_text'],
                user=self.request.user,
                room_name=new_room,
                room=new_room
            )


# This will get the list of all the users
class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer
    pagination_class = UsersSuggestionPaginatin


# This will be called userRetrieve the idea is the 
# client will pass a user id logged in and 
# this will return what user is logged in depedning
# on that ID passed in the url from the client. 
class UserRetrieveAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer


# This will check if the email entered in the profile
# exisits for another user to avoid having
# to users with the same email
class UserRetrieveByEmailAPIView(generics.ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(email=self.kwargs['email'])


# This will get info entered by the user when updating
# the user profile and update the user model
class UserUpdateAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer


# This is used to create a new user sign up.
class UserCreateAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        serializer.save(password=make_password(serializer.validated_data.get('password')))


# This will get all teh posts and filters them
# based on the user input. Fields working now
# content and author username
class PostListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Post.objects.all().order_by('-posted_date')
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['content', 'author__username']


# This is used to like a post
class PostLikeAPIView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = PostSerializer
    queryset = Post.objects.all()


# This is used to dislike a post
class PostDislikeAPIView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = PostSerializer
    queryset = Post.objects.all()  # all the updated views can be one fix!!!


# User to create a post. 
class PostCreateAPIView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = PostSerializer

    # I used this to set the author as the 
    # user making the request. django knows
    # what user is making the request because
    # of the jwt token used to make the request.
    def perform_create(self, serializer):
        serializer.save(
            content=serializer.validated_data['content'],
            author=self.request.user,
        )


# This view will receive a comment from createComment
# from comments slice then add author fields
# of the comment model using the user making
# the request. the user making the request
# is determined based on the jwt token.
class CommentCreateAPIView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = CommentSerializer

    # I used this to set the author as the 
    # user making the request. django knows
    # what user is making the request because
    # of the jwt token used to make the request.
    def perform_create(self, serializer):
        serializer.save(
            body=serializer.validated_data['body'],
            author=self.request.user,
        )


# This view will get a post.id from the client
# The functions is getCommentsByPost from comments
# slice. This will filter the comments based on
# the post.id and return the results based
# on create_on field of the comments model.
class CommentListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(post=self.kwargs['pk']).order_by('-created_on')


# used this to add more fields to the jwt token. the
# default works but the fields are limited.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# This is used to update the profile model
class ProfileUpdateView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


# This is used to get the profile based on the 
# user logged in id passed from the client.
class ProfileListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ProfileSerializer
    # queryset = Profile.objects.all()

    def get_queryset(self):
        user_logged_in = User.objects.filter(
            pk=self.kwargs['user_logged_in_id']).first()
        return Profile.objects.filter(user=user_logged_in)
