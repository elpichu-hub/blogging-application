from rest_framework import serializers
from .models import Message, Post, Comment, Profile
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MessageSerializer(serializers.ModelSerializer):
    from_user_username = serializers.ReadOnlyField(source='user.username')
    from_user_profile_img = serializers.ReadOnlyField(source='user.profile.image.url')
    class Meta:
        model = Message
        fields = [
            'to_user', 'from_user_username',
            'message_text', 'sent_datetime',
            'user', 'room', 'room_name', 
            'from_user_profile_img', 'id'
        ]


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'image', 'phone_number', 'profession']


class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.ReadOnlyField(source='profile.image.url')
    profession = serializers.ReadOnlyField(source='profile.profession')
    phone_number = serializers.ReadOnlyField(source='profile.phone_number')

    class Meta:
        model = User
        fields = ['id', 'username', 'profile_image', 'email',
                  'first_name', 'last_name', 'profession', 'phone_number', 'password', ]

    extra_kwargs = {
            'password': {'write_only': True},
            # 'email': {
            #     'required': True,
            #     'allow_blank': False,
            #     'validators': [
            #         validators.UniqueValidator(
            #             User.objects.all(), 'A user with that Email already exists'
            #         )
            #     ]
            # }
        }





class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')
    profile_image = serializers.ReadOnlyField(
        source='author.profile.image.url')

    class Meta:
        model = Comment
        fields = ['id', 'post', 'body',
                  'created_on', 'author', 'profile_image']


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')

    profile_image = serializers.ReadOnlyField(
        source='author.profile.image.url')
    # to get all the information about the target model use the serializer
    # like this and you will get all the info included in the target model
    # in the response in json
    comments = CommentSerializer(many=True, read_only=True)

    # SlugRelatedField may be used to represent the target of the relationship using a field.
    # it can be any fields of the target model on the target.
    # comments = serializers.SlugRelatedField(many=True, slug_field='body', read_only=True,)

    # Use the relation below to access the target which is the comments model through its
    # primary key
    # comments = serializers.PrimaryKeyRelatedField(many=True, queryset = Comment.objects.all())

    # Use the relation below to represent the target through its __str__ method in the model
    # comments = serializers.StringRelatedField(many=True)

    class Meta:
        model = Post
        fields = ['id', 'content', 'posted_date', 'author',
                  'profile_image', 'likes', 'dislikes', 'comments']


# This is used to add extra fileds to the jwt token. 
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['phone_number'] = user.profile.phone_number
        token['profession'] = user.profile.profession
        token['profile_id'] = user.profile.id
        # Add more fields.
        return token
