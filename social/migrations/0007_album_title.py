# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0006_auto_20151014_0423'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='title',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
