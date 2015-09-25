from django.contrib.auth.models import User , Group
from rest_framework import viewsets , permissions , serializers
from rest_framework.decorators import detail_route
from .serializers import UserSerializer , GroupSerializer , LeaveApplicationSerializer
from leaveManagement.models import leaveApplication

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class LeaveApplicationViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = leaveApplication.objects.all()
    serializer_class = LeaveApplicationSerializer
    @detail_route()
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
