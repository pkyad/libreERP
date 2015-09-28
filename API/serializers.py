from django.contrib.auth.models import User , Group
from rest_framework import serializers
from leaveManagement.models import leaveApplication
from organisation.models import userDesignation

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url' , 'username' , 'email' , 'groups' , 'first_name' , 'last_name' , 'leaveapplication_set')

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('url' , 'name')
class LeaveApplicationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = leaveApplication
        fields = ('url' , 'reason' , 'start' , 'end' , 'user' , 'attachment')

class selfSerializerLeaveManagement(serializers.ModelSerializer):
    class Meta:
        model = leaveApplication
        fields = ('url' , 'reason' , 'start' , 'end' , 'attachment')

class userDesignationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = userDesignation
        fields = ('url', 'user' , 'unit', 'domain' , 'domainType' , 'department' , 'designation' , 'reportingTo' , 'primaryApprover' , 'secondaryApprover', 'rank')
