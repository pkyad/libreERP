from django.contrib.auth.models import User , Group
from rest_framework import viewsets , permissions , serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import detail_route,list_route
from url_filter.integrations.drf import DjangoFilterBackend
from django.shortcuts import render
from .serializers import *
from .models import *

# Create your views here.
class postViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = postSerializer
    def get_queryset(self):
        if 'user' in self.request.GET:
            u = User.objects.get(username = self.request.GET['user'] )
            return post.objects.filter(user = u).order_by('-created')
        else :
            return post.objects.filter(user = self.request.user)

class pictureViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = pictureSerializer
    def get_queryset(self):
        if 'user' in self.request.GET:
            u = User.objects.get(username = self.request.GET['user'])
            return picture.objects.filter(user = u).order_by('-created')
        else :
            return picture.objects.filter(user = self.request.user)

class albumViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = albumSerializer
    def get_queryset(self):
        if 'user' in self.request.GET:
            u = User.objects.get(username = self.request.GET['user'] )
            return album.objects.filter(user = u).order_by('-created')
        else :
            return album.objects.filter(user = self.request.user)
class postCommentsViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = postCommentsSerializer
    queryset = postComment.objects.all()
class postLikesViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = postLikeSerializer
    queryset = postLike.objects.all()
class commentLikesViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = commentLikeSerializer
    queryset = commentLike.objects.all()

class pictureCommentsViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = pictureCommentsSerializer
    queryset = pictureComment.objects.all()

class pictureLikesViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = pictureLikeSerializer
    queryset = pictureLike.objects.all()
