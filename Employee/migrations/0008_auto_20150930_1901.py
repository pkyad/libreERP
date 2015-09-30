# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0007_auto_20150929_1302'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatmessage',
            name='originator',
            field=models.ForeignKey(related_name='IMsTo', to=settings.AUTH_USER_MODEL, null=True),
        ),
    ]
