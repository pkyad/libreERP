# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import Employee.models


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0009_auto_20150930_1913'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='aboutMe',
            field=models.TextField(max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='coverPic',
            field=models.ImageField(null=True, upload_to=Employee.models.getSocialCoverPictureUploadPath, blank=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='status',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
