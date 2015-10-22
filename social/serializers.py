from rest_framework import serializers
from .models import *
from API.serializers import UserSerializer
from django.core.exceptions import ValidationError

class commentLikeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = commentLike
        fields = ('url' , 'user' , 'created' )
class postLikeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = postLike
        fields = ('url' , 'user' , 'created' , 'parent')
    def create(self , validated_data):
        parent = validated_data.pop('parent')
        user =  self.context['request'].user
        if postLike.objects.filter(parent = parent , user = user).exists():
            like = postLike.objects.get(parent = parent , user = user)
        else:
            like = postLike(parent = parent , user = user)
        like.save()
        return like

class postCommentsSerializer(serializers.HyperlinkedModelSerializer):
    likes = commentLikeSerializer(many = True , read_only = True)
    class Meta:
        model = postComment
        fields = ('url' , 'user' , 'parent' , 'created' , 'text' , 'attachment' , 'likes')
    def create(self , validated_data):
        text = validated_data.pop('text')
        parent = validated_data.pop('parent')
        user =  self.context['request'].user
        comment = postComment(text = text , parent = parent , user = user)
        comment.save()
        return comment
    def update(self, instance, validated_data): # like the comment
        print "came in the update function"
        user =  self.context['request'].user
        l = commentLike(user = user , parent = instance)
        l.save()
        print dir(self)
        print user
        return instance

class pictureLikeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = pictureLike
        fields = ('url' , 'user' , 'created' , 'parent')
    def create(self , validated_data):
        parent = validated_data.pop('parent')
        user =  self.context['request'].user
        if pictureLike.objects.filter(parent = parent , user = user).exists():
            like = pictureLike.objects.get(parent = parent , user = user)
        else:
            like = pictureLike(parent = parent , user = user)
        like.save()
        return like

class pictureCommentsSerializer(serializers.HyperlinkedModelSerializer):
    likes = commentLikeSerializer(many = True , read_only = True)
    class Meta:
        model = pictureComment
        fields = ('url' , 'user' , 'parent' , 'created' , 'text' , 'attachment' , 'likes')
    def create(self , validated_data):
        text = validated_data.pop('text')
        parent = validated_data.pop('parent')
        user =  self.context['request'].user
        comment = pictureComment(text = text , parent = parent , user = user)
        comment.save()
        return comment
    def update(self, instance, validated_data): # like the comment
        print "came in the update function"
        user =  self.context['request'].user
        l = commentLike(user = user , parent = instance)
        l.save()
        return instance

class postSerializer(serializers.HyperlinkedModelSerializer):
    likes = postLikeSerializer(many = True , read_only = True)
    comments = postCommentsSerializer(many = True , read_only = True)
    class Meta:
        model = post
        fields = ('url' , 'user' , 'created' , 'likes' , 'text' , 'attachment' , 'comments')

    def create(self ,  validated_data):
        text = validated_data.pop('text')
        print validated_data
        # attached = validated_data.pop('attachment')
        # print attached
        user =  self.context['request'].user
        p = post()
        p.user = user
        p.text = text
        # p.attachment = attached
        p.save()
        return p
    def update(self, instance, validated_data): # like the comment
        instance.text = validated_data.pop('text');
        instance.save()
        return instance



class pictureSerializer(serializers.HyperlinkedModelSerializer):
    likes = pictureLikeSerializer(many = True)
    comments = pictureCommentsSerializer(many = True)
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
def only_numerics(seq):
    return filter(type(seq).isdigit, seq)

class albumSerializer(serializers.HyperlinkedModelSerializer):
    photos = pictureSerializer(many = True , read_only = True)
    class Meta:
        model = album
        fields = ('url' , 'user' , 'created' , 'photos', 'title' )
    def create(self ,  validated_data):
        photos =  self.context['request'].data['photos']
        user =  self.context['request'].user
        a = album(user = user , title = validated_data.pop('title'))
        a.save()
        count = 0
        for p in photos:
            pk = only_numerics(p)
            pic = picture.objects.get(pk = int(pk) , user = user)
            pic.album = a
            count +=1
            pic.save()
        if count==0: # if there wasn't any photo supplied or the photo does not owned by the sender
            a.delete()
        return a
