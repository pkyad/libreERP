# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('social', '0002_auto_20151013_1749'),
    ]

    operations = [
        migrations.CreateModel(
            name='socialProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('aboutMe', models.TextField(max_length=500)),
                ('status', models.TextField(max_length=200)),
                ('user', models.ForeignKey(related_name='socialProfile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='picture',
            name='album',
        ),
        migrations.AddField(
            model_name='album',
            name='photos',
            field=models.ManyToManyField(related_name='containsIn', to='social.picture'),
        ),
    ]
