# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0011_auto_20151027_0021'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='docUniversity',
            field=models.CharField(max_length=100, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='pgUniversity',
            field=models.CharField(max_length=100, null=True, blank=True),
        ),
    ]
