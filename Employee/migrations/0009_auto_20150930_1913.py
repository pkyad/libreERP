# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0008_auto_20150930_1901'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatmessage',
            name='originator',
            field=models.ForeignKey(related_name='sentIMs', to=settings.AUTH_USER_MODEL, null=True),
        ),
    ]
