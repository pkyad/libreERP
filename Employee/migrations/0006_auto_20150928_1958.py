# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0005_notification_onhold'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='department',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='designation',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='domain',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='group',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='subGroup',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='team',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='unit',
        ),
    ]
