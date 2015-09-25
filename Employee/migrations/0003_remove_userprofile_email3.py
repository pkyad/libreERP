# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0002_remove_userprofile_joiningdate'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='email3',
        ),
    ]
