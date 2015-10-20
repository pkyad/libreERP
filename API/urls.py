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
router.register(r'socialPost' , postViewSet , base_name ='post')
router.register(r'socialPicture' , pictureViewSet , base_name ='picture')
router.register(r'socialAlbum' , albumViewSet , base_name ='album')
router.register(r'socialPostComment' , postCommentsViewSet , base_name ='postcomment')
router.register(r'socialPostLike' , postLikesViewSet , base_name ='postlike')
router.register(r'socialCommentLike' , commentLikesViewSet , base_name ='commentlike')
router.register(r'socialPictureComment' , pictureCommentsViewSet , base_name ='picturecomment')
router.register(r'socialPictureLike' , pictureLikesViewSet , base_name ='picturelike')

urlpatterns = [
    url(r'^', include(router.urls)),
]
