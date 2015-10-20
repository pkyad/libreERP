# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0003_auto_20151020_0009'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='pictureLikes',
            new_name='commentLike',
        ),
        migrations.RenameModel(
            old_name='pictureComments',
            new_name='pictureComment',
        ),
        migrations.RenameModel(
            old_name='postLikes',
            new_name='pictureLike',
        ),
        migrations.RenameModel(
            old_name='postComments',
            new_name='postComment',
        ),
        migrations.RenameModel(
            old_name='commentLikes',
            new_name='postLike',
        ),
        migrations.AlterField(
            model_name='commentlike',
            name='parent',
            field=models.ForeignKey(related_name='likes', to='social.comment'),
        ),
        migrations.AlterField(
            model_name='picturelike',
            name='parent',
            field=models.ForeignKey(related_name='likes', to='social.picture'),
        ),
        migrations.AlterField(
            model_name='postlike',
            name='parent',
            field=models.ForeignKey(related_name='likes', to='social.post'),
        ),
    ]
