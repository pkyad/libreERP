# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0006_auto_20150928_1958'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='domain',
            field=models.CharField(default=b'SYS', max_length=3, choices=[(b'SYS', b'System'), (b'ADM', b'Administration'), (b'APP', b'Application')]),
        ),
        migrations.AlterField(
            model_name='notification',
            name='message',
            field=models.TextField(max_length=300, null=True),
        ),
    ]
