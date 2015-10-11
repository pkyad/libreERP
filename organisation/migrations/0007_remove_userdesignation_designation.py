# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0006_auto_20150928_2255'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userdesignation',
            name='designation',
        ),
    ]
