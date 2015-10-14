# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('social', '0003_auto_20151014_0050'),
    ]

    operations = [
        migrations.CreateModel(
            name='like',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='pictureComments',
            fields=[
                ('comment_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='social.comment')),
            ],
            bases=('social.comment',),
        ),
        migrations.CreateModel(
            name='postComments',
            fields=[
                ('comment_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='social.comment')),
            ],
            bases=('social.comment',),
        ),
        migrations.RemoveField(
            model_name='album',
            name='comments',
        ),
        migrations.RemoveField(
            model_name='album',
            name='likers',
        ),
        migrations.RemoveField(
            model_name='album',
            name='photos',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='likers',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='parent',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='text',
        ),
        migrations.RemoveField(
            model_name='picture',
            name='comments',
        ),
        migrations.RemoveField(
            model_name='picture',
            name='likers',
        ),
        migrations.RemoveField(
            model_name='post',
            name='comments',
        ),
        migrations.RemoveField(
            model_name='post',
            name='likers',
        ),
        migrations.RemoveField(
            model_name='post',
            name='tagged',
        ),
        migrations.AddField(
            model_name='picture',
            name='album',
            field=models.ForeignKey(related_name='belongsTo', to='social.album', null=True),
        ),
        migrations.AlterField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(related_name='postsCommented', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='commentLikes',
            fields=[
                ('like_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='social.like')),
                ('parent', models.ForeignKey(related_name='likes', to='social.comment')),
            ],
            bases=('social.like',),
        ),
        migrations.CreateModel(
            name='pictureLike',
            fields=[
                ('like_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='social.like')),
                ('parent', models.ForeignKey(related_name='likes', to='social.picture')),
            ],
            bases=('social.like',),
        ),
        migrations.CreateModel(
            name='postLikes',
            fields=[
                ('like_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='social.like')),
                ('parent', models.ForeignKey(related_name='likes', to='social.post')),
            ],
            bases=('social.like',),
        ),
        migrations.AddField(
            model_name='postcomments',
            name='parent',
            field=models.ForeignKey(related_name='comments', to='social.post'),
        ),
        migrations.AddField(
            model_name='picturecomments',
            name='parent',
            field=models.ForeignKey(related_name='comments', to='social.picture'),
        ),
        migrations.AddField(
            model_name='like',
            name='user',
            field=models.ForeignKey(related_name='commentsLiked', to=settings.AUTH_USER_MODEL),
        ),
    ]
