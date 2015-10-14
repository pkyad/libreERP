# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0005_auto_20151014_0339'),
    ]

    operations = [
        migrations.AlterField(
            model_name='picture',
            name='album',
            field=models.ForeignKey(related_name='photos', to='social.album', null=True),
        ),
    ]
