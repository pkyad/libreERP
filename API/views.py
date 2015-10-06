from django.contrib.auth.models import User , Group
from rest_framework import viewsets , permissions , serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import detail_route,list_route
from url_filter.integrations.drf import DjangoFilterBackend
from .serializers import UserSerializer , GroupSerializer , LeaveApplicationSerializer, selfSerializerLeaveManagement , userDesignationSerializer
from .serializers import notificationSerializer, chatMessageSerializer , userProfileSerializer
from .permissions import isOwner , readOnly
from leaveManagement.models import leaveApplication
from Employee.models import notification, chatMessage , userProfile
from organisation.models import userDesignation

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    # queryset = User.objects.all().order_by('-date_joined')
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['username']
    serializer_class = UserSerializer
    def get_queryset(self):
        if 'mode' in self.request.GET:
            if self.request.GET['mode']=="mySelf":
                return User.objects.filter(username = self.request.user.username)
            else :
                return User.objects.all().order_by('-date_joined')
        else:
            return User.objects.all().order_by('-date_joined')

class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class LeaveApplicationViewSet(viewsets.ModelViewSet):
    permission_classes = ( isOwner, )
    queryset = leaveApplication.objects.all()
    serializer_class = LeaveApplicationSerializer
    @detail_route()
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

class selfSerializerLeaveManagementViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    serializer_class = selfSerializerLeaveManagement
    def get_queryset(self):
        return leaveApplication.objects.filter(user = self.request.user)

class userDesignationViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = userDesignation.objects.all()
    serializer_class = userDesignationSerializer
class userProfileViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = userProfileSerializer
    queryset = userProfile.objects.all()


class notificationViewSet(viewsets.ModelViewSet):
    permission_classes = (isOwner, )
    serializer_class = notificationSerializer
    def get_queryset(self):
        return notification.objects.filter(user = self.request.user)
    @detail_route()
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

class chatMessageViewSet(viewsets.ModelViewSet):
    permission_classes = (isOwner, )
    serializer_class = chatMessageSerializer
    def get_queryset(self):
        return chatMessage.objects.filter(user = self.request.user , read = False).order_by('-created')
    @detail_route()
    def perform_create(self, serializer):
        serializer.save(originator = self.request.user)


class chatMessageBetweenViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, readOnly)
    serializer_class = chatMessageSerializer

    def get_queryset(self):
        reciepient = User.objects.get(username = self.request.GET['other'])
        qs1 = chatMessage.objects.filter(originator = self.request.user , user= reciepient)
        qs2 = chatMessage.objects.filter(user = self.request.user , originator= reciepient)
        qs = qs1 | qs2
        return qs.order_by('created')[:30]
