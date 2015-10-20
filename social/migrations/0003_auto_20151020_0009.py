# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0002_auto_20151019_2338'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='postLike',
            new_name='commentLikes',
        ),
        migrations.RenameModel(
            old_name='pictureComment',
            new_name='pictureComments',
        ),
        migrations.RenameModel(
            old_name='pictureLike',
            new_name='pictureLikes',
        ),
        migrations.RenameModel(
            old_name='postComment',
            new_name='postComments',
        ),
        migrations.RenameModel(
            old_name='commentLike',
            new_name='postLikes',
        ),
        migrations.AlterField(
            model_name='commentlikes',
            name='parent',
            field=models.ForeignKey(related_name='likes', to='social.comment'),
        ),
        migrations.AlterField(
            model_name='postlikes',
            name='parent',
            field=models.ForeignKey(related_name='likes', to='social.post'),
        ),
    ]
