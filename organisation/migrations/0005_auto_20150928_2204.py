# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0004_auto_20150928_2152'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdesignation',
            name='user',
            field=models.ForeignKey(related_name='designation', to=settings.AUTH_USER_MODEL),
        ),
    ]
