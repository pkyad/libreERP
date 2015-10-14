# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import social.models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='comment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('parent', models.CharField(default=b'none', max_length=5, choices=[(b'none', b'not selected'), (b'album', b'album'), (b'photo', b'photo'), (b'post', b'post')])),
                ('created', models.DateTimeField(auto_now=True)),
                ('text', models.TextField(max_length=300)),
                ('attachment', models.FileField(null=True, upload_to=social.models.getCommentAttachmentPath)),
                ('likers', models.ManyToManyField(related_name='socialCommentsLikes', null=True, to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(related_name='socialComments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
