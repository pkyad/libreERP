from django.conf.urls import include, url
from rest_framework import routers
from . import views
from social.views import *

router = routers.DefaultRouter()
router.register(r'users' , views.UserViewSet , base_name = 'user')
router.register(r'groups' , views.GroupViewSet)
router.register(r'leaveApplications' , views.LeaveApplicationViewSet)
router.register(r'myLeave' , views.selfSerializerLeaveManagementViewSet, base_name = 'myLeave')
router.register(r'userDesignation' , views.userDesignationViewSet , base_name = 'userdesignation')
router.register(r'notification' , views.notificationViewSet, base_name = 'notification')
router.register(r'chatMessage' , views.chatMessageViewSet, base_name = 'chatmessage')
router.register(r'chatMessageBetween' , views.chatMessageBetweenViewSet, base_name = 'chatbetween')
router.register(r'userProfile' , views.userProfileViewSet , base_name ='userprofile')
router.register(r'socialPost' , socialPostViewSet , base_name ='post')
router.register(r'socialPicture' , socialPictureViewSet , base_name ='picture')
router.register(r'socialAlbum' , socialAlbumViewSet , base_name ='album')
urlpatterns = [
    url(r'^', include(router.urls)),
]
