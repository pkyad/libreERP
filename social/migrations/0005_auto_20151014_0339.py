# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0004_auto_20151014_0323'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='picture',
            name='tagged',
        ),
        migrations.AddField(
            model_name='picture',
            name='tagged',
            field=models.CharField(max_length=1000, null=True),
        ),
    ]
