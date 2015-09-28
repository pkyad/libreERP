# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0003_auto_20150928_2053'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userdesignation',
            name='group',
        ),
        migrations.RemoveField(
            model_name='userdesignation',
            name='subGroup',
        ),
        migrations.RemoveField(
            model_name='userdesignation',
            name='team',
        ),
    ]
