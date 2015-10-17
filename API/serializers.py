from django.contrib.auth.models import User , Group
from rest_framework import serializers
from leaveManagement.models import leaveApplication
from organisation.models import userDesignation
from Employee.models import notification, chatMessage , userProfile
from organisation.models import userDesignation

class userDesignationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = userDesignation
        fields = ('url' , 'user', 'domainType' , 'domain' , 'rank' , 'unit' , 'department' , 'reportingTo' , 'primaryApprover' , 'secondaryApprover')


class userProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = userProfile
        fields = ('url' , 'user', 'mobile' , 'displayPicture' , 'website' , 'prefix', 'aboutMe', 'status' , 'coverPic')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    profile = userProfileSerializer(many=False , read_only=True)
    designation = userDesignationSerializer(many = False , read_only=True) # to get the organisational details for the user
    class Meta:
        model = User
        fields = ('url' , 'username' , 'email' , 'first_name' , 'last_name' , 'profile' , 'designation')
    # def update(self, instance, validated_data):
    #     designation_data = validated_data.pop('designation')
    #     designation = instance.designation
    #     designation.domainType = designation_data.get('domainType')
    #     designation.primaryApprover = designation_data.get('primaryApprover')
    #     designation.secondaryApprover = designation_data.get('secondaryApprover')
    #     designation.reportingTo = designation_data.get('reportingTo')
    #     designation.rank = designation_data.get('rank')
    #     designation.department = designation_data.get('department')
    #     designation.domain = designation_data.get('domain')
    #     designation.unit = designation_data.get('unit')
    #     designation.save()
    #     return instance

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

class notificationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = notification
        fields = ('url' , 'message' ,'shortInfo','domain','onHold', 'link' , 'originator' , 'created' ,'updated' , 'read')

class chatMessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = chatMessage
        fields = ('url' , 'message' ,'attachment', 'originator' , 'created' , 'read' , 'user')
