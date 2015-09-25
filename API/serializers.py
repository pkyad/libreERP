from django.contrib.auth.models import User , Group
from rest_framework import serializers
from leaveManagement.models import leaveApplication

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url' , 'username' , 'email' , 'groups' , 'first_name' , 'last_name')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url' , 'name')
class LeaveApplicationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = leaveApplication
        fields = ('reason' , 'start' , 'end' , 'user' , 'attachment')
