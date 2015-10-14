# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import social.models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('social', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='album',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='picture',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('photo', models.ImageField(upload_to=social.models.getSocialPictureUploadPath)),
                ('created', models.DateTimeField(auto_now=True)),
                ('album', models.ForeignKey(related_name='photos', to='social.album')),
            ],
        ),
        migrations.CreateModel(
            name='post',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.TextField(max_length=300)),
                ('attachment', models.FileField(null=True, upload_to=social.models.getPostAttachmentPath)),
                ('created', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.AlterField(
            model_name='comment',
            name='likers',
            field=models.ManyToManyField(related_name='socialCommentsLikes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='post',
            name='comments',
            field=models.ManyToManyField(related_name='parentPostObject', to='social.comment'),
        ),
        migrations.AddField(
            model_name='post',
            name='likers',
            field=models.ManyToManyField(related_name='socialPostLikes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='post',
            name='tagged',
            field=models.ManyToManyField(related_name='socialPostTags', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='post',
            name='user',
            field=models.ForeignKey(related_name='socialPost', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='picture',
            name='comments',
            field=models.ManyToManyField(related_name='parentPictureObject', to='social.comment'),
        ),
        migrations.AddField(
            model_name='picture',
            name='likers',
            field=models.ManyToManyField(related_name='likedPictures', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='picture',
            name='tagged',
            field=models.ManyToManyField(related_name='socialPhotoTags', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='picture',
            name='user',
            field=models.ForeignKey(related_name='socialPhotos', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='album',
            name='comments',
            field=models.ManyToManyField(related_name='parentAlbumObject', to='social.comment'),
        ),
        migrations.AddField(
            model_name='album',
            name='likers',
            field=models.ManyToManyField(related_name='albumsLiked', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='album',
            name='user',
            field=models.ForeignKey(related_name='socialAlbums', to=settings.AUTH_USER_MODEL),
        ),
    ]
