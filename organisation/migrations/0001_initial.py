# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='userDesignation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
                ('primaryApprover', models.ForeignKey(related_name='approving', to=settings.AUTH_USER_MODEL)),
                ('reportingTo', models.ForeignKey(related_name='managing', to=settings.AUTH_USER_MODEL)),
                ('secondaryApprover', models.ForeignKey(related_name='alsoApproving', to=settings.AUTH_USER_MODEL)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
