# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0004_auto_20151020_0017'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='picture',
            name='album',
        ),
        migrations.AddField(
            model_name='picture',
            name='album',
            field=models.ManyToManyField(related_name='photos', null=True, to='social.album'),
        ),
    ]
