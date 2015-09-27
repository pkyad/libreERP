# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0004_auto_20150926_0618'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='onHold',
            field=models.BooleanField(default=False),
        ),
    ]
