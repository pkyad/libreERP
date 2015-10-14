from rest_framework import serializers
from .models import post , album , picture , socialProfile
from API.serializers import UserSerializer


# class socialCommentsSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = comment
#         fields = ('url' , 'user' , 'parent' , 'created' , 'likers' , 'text' , 'attachment')

class socialPostSerializer(serializers.HyperlinkedModelSerializer):
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
