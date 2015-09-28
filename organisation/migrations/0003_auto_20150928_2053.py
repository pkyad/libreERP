# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0002_auto_20150928_1958'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdesignation',
            name='primaryApprover',
            field=models.ForeignKey(related_name='approving', to=settings.AUTH_USER_MODEL, null=True),
        ),
        migrations.AlterField(
            model_name='userdesignation',
            name='reportingTo',
            field=models.ForeignKey(related_name='managing', to=settings.AUTH_USER_MODEL, null=True),
        ),
        migrations.AlterField(
            model_name='userdesignation',
            name='secondaryApprover',
            field=models.ForeignKey(related_name='alsoApproving', to=settings.AUTH_USER_MODEL, null=True),
        ),
    ]
