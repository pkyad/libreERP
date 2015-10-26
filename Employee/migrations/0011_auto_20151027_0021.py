# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0010_auto_20151015_0359'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='docUniversity',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='pgUniversity',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
