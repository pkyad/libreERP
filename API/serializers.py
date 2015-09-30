from django.contrib.auth.models import User , Group
from rest_framework import serializers
from leaveManagement.models import leaveApplication
from organisation.models import userDesignation
from Employee.models import notification, chatMessage , userProfile


class userProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = userProfile
        fields = ('url' , 'mobile' , 'displayPicture' , 'website' , 'prefix')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    profile = userProfileSerializer(many=False)
    class Meta:
        model = User
        fields = ('url' , 'username' , 'email' , 'first_name' , 'last_name' , 'profile')

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

class notificationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = notification
        fields = ('url' , 'message' ,'shortInfo','domain','onHold', 'link' , 'originator' , 'created' ,'updated' , 'read')

class chatMessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = chatMessage
        fields = ('url' , 'message' ,'attachment', 'originator' , 'created' , 'read')
