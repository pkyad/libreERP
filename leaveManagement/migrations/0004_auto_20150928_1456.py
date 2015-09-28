# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('leaveManagement', '0003_auto_20150928_1325'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leavecompensation',
            name='adminApprover',
            field=models.ForeignKey(related_name='leaveApprovedVeriefied', to=settings.AUTH_USER_MODEL, null=True),
        ),
        migrations.AlterField(
            model_name='leavecompensation',
            name='approver',
            field=models.ForeignKey(related_name='leaveApproved', to=settings.AUTH_USER_MODEL, null=True),
        ),
    ]
