"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from blog.views import (
    PostListAPIView, UserListAPIView,
    PostLikeAPIView, PostDislikeAPIView,
    CommentCreateAPIView, CommentListAPIView,
    PostCreateAPIView, MyTokenObtainPairView,
    ProfileUpdateView, UserUpdateAPIView,
    UserRetrieveAPIView, 
    MessageCreateAPIView, ProfileListAPIView,
    UserCreateAPIView, UserRetrieveByEmailAPIView
)
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('getPosts', PostListAPIView.as_view(), name='getPosts'),
    path('getUsers', UserListAPIView.as_view(), name='getUsers'),
    path('likePost/<pk>', PostLikeAPIView.as_view(), name='likePost'),
    path('dislikePost/<pk>', PostDislikeAPIView.as_view(), name='dislikePost'),
    path('createComment', CommentCreateAPIView.as_view(), name='createComment'),
    path('getCommentsByPost/<pk>', CommentListAPIView.as_view(), name='getCommentsByPost'),
    path('createPost', PostCreateAPIView.as_view(), name='createPost'),
    path('updateProfile/<pk>', ProfileUpdateView.as_view(), name='updateProfile'),
    path('getProfile/<user_logged_in_id>', ProfileListAPIView.as_view(), name='getProfile' ),
    path('updateUser/<pk>', UserUpdateAPIView.as_view(), name='updateUser'),
    path('retrieveUser/<pk>', UserRetrieveAPIView.as_view(), name='retrieveUser'),
    path('UserRetrieveByEmailAPIView/<email>', UserRetrieveByEmailAPIView.as_view(), name='UserRetrieveByEmailAPIView'),
    path('createMessage', MessageCreateAPIView.as_view(), name='createMessage'),
    path('signup', UserCreateAPIView.as_view(), name='signup'),
    # This path was intended to be used with fetch, instead i'm getting
    # the messages with websocket.
    # path('getMessages/<room_id>', MessageListAPIView.as_view(), name='getMessages'),
    

    # Simple JWT endpoints
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #Djoser endpoints
    path('auth/', include('djoser.urls')),

    #React endpoints
    path('', TemplateView.as_view(template_name='index.html'), name='reactApp'),
    path('reset_password', TemplateView.as_view(template_name='index.html'), name='reset_password'),
    path('password/reset/confirm/<uid>/<token>', TemplateView.as_view(template_name='index.html'), name='reset_password_confirm'),

   
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
