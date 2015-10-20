# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='commentLikes',
            new_name='commentLike',
        ),
        migrations.RenameModel(
            old_name='pictureComments',
            new_name='pictureComment',
        ),
        migrations.RenameModel(
            old_name='postComments',
            new_name='postComment',
        ),
        migrations.RenameModel(
            old_name='postLikes',
            new_name='postLike',
        ),
    ]
