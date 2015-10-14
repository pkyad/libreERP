from django.contrib.auth.models import User , Group
from rest_framework import viewsets , permissions , serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import detail_route,list_route
from url_filter.integrations.drf import DjangoFilterBackend
from django.shortcuts import render
from .serializers import socialPostSerializer , socialPictureSerializer , socialAlbumSerializer
from .models import comment , post , picture , album


# Create your views here.
class socialPostViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = socialPostSerializer
    def get_queryset(self):
        if 'user' in self.request.GET:
            u = User.objects.get(username = self.request.GET['user'] )
            return post.objects.filter(user = u).order_by('-created')
        else :
            return post.objects.filter(user = self.request.user)

class socialPictureViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = socialPictureSerializer
    def get_queryset(self):
        if 'user' in self.request.GET:
            u = User.objects.get(username = self.request.GET['user'] )
            return post.objects.filter(user = u).order_by('-created')
        else :
            return post.objects.filter(user = self.request.user)

class socialAlbumViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = socialAlbumSerializer
    def get_queryset(self):
        if 'user' in self.request.GET:
            u = User.objects.get(username = self.request.GET['user'] )
            return post.objects.filter(user = u).order_by('-created')
        else :
            return post.objects.filter(user = self.request.user)
