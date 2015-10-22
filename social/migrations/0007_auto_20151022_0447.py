# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0006_auto_20151022_0446'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='picture',
            name='album',
        ),
        migrations.AddField(
            model_name='picture',
            name='album',
            field=models.ForeignKey(related_name='photos', to='social.album', null=True),
        ),
    ]
