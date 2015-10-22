# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0007_auto_20151022_0447'),
    ]

    operations = [
        migrations.CreateModel(
            name='postHistory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now=True)),
                ('text', models.TextField(max_length=300)),
                ('parent', models.ForeignKey(related_name='history', to='social.post')),
            ],
        ),
    ]
