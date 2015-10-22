# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0005_auto_20151022_0445'),
    ]

    operations = [
        migrations.AlterField(
            model_name='picture',
            name='album',
            field=models.ManyToManyField(related_name='photos', to='social.album'),
        ),
    ]
