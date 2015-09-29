from django.contrib.auth.models import User , Group
from rest_framework import viewsets , permissions , serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import detail_route,list_route
from .serializers import UserSerializer , GroupSerializer , LeaveApplicationSerializer, selfSerializerLeaveManagement , userDesignationSerializer
from .serializers import notificationSerializer
from leaveManagement.models import leaveApplication
from Employee.models import notification
from .permissions import isOwner
from organisation.models import userDesignation

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

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

class notificationViewSet(viewsets.ModelViewSet):
    permission_classes = (isOwner, )
    serializer_class = notificationSerializer
    def get_queryset(self):
        return notification.objects.filter(user = self.request.user)
    @detail_route()
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
