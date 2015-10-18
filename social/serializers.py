from rest_framework import serializers
from .models import post , album , picture , postComments , pictureComments , postLikes , pictureLike , commentLikes
from API.serializers import UserSerializer
from django.core.exceptions import ValidationError

class socialCommentLikeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = commentLikes
        fields = ('url' , 'user' , 'created')
class socialPostLikeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = postLikes
        fields = ('url' , 'user' , 'created' , 'parent')
    def create(self , validated_data):
        parent = validated_data.pop('parent')
        user =  self.context['request'].user
        if postLikes.objects.filter(parent = parent , user = user).exists():
            like = postLikes.objects.get(parent = parent , user = user)
        else:
            like = postLikes(parent = parent , user = user)
        like.save()
        return like

class socialPostCommentsSerializer(serializers.HyperlinkedModelSerializer):
    likes = socialCommentLikeSerializer(many = True , read_only = True)
    class Meta:
        model = postComments
        fields = ('url' , 'user' , 'parent' , 'created' , 'text' , 'attachment' , 'likes')
    def create(self , validated_data):
        text = validated_data.pop('text')
        parent = validated_data.pop('parent')
        user =  self.context['request'].user
        comment = postComments(text = text , parent = parent , user = user)
        comment.save()
        return comment

class socialPostSerializer(serializers.HyperlinkedModelSerializer):
    likes = socialPostLikeSerializer(many = True)
    comments = socialPostCommentsSerializer(many = True)
    class Meta:
        model = post
        fields = ('url' , 'user' , 'created' , 'likes' , 'text' , 'attachment' , 'comments')

    def create(self ,  validated_data):
        text = validated_data.pop('text')
        attached = validated_data.pop('attachment')
        user =  self.context['request'].user
        p = post()
        p.user = user
        p.text = text
        p.attachment = attached
        p.save()
        return p

class socialPictureSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = picture
        fields = ('url' , 'user' , 'created' , 'likes' , 'photo' , 'comments' , 'tagged')
    def create(self ,  validated_data):
        photo = validated_data.pop('photo')
        tagged = validated_data.pop('tagged')
        user =  self.context['request'].user
        pic = picture()
        pic.photo = photo
        pic.tagged = tagged
        pic.user = user
        pic.save()
        return pic

class socialAlbumSerializer(serializers.HyperlinkedModelSerializer):
    photos = socialPictureSerializer(many = True)
    class Meta:
        model = album
        fields = ('url' , 'user' , 'created' , 'photos', 'title' )
    def create(self ,  validated_data):
        photos = validated_data.pop('photos')
        user =  self.context['request'].user
        a = album(user = user , title = validated_data.pop('title'))
        a.save()
        for p in photos:
            pic = picture.objects.get(photo = p.photo)
            pic.album = a
            pic.save()
        return a
