# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import leaveManagement.models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='leaveApplication',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('category', models.CharField(default=b'CAS', max_length=3, choices=[(b'NOT', b'Not selected..'), (b'CAS', b'Casual'), (b'MED', b'Medical'), (b'PAR', b'Parental'), (b'MAT', b'Maternity'), (b'MAR', b'Marriage'), (b'WOR', b'Work from home'), (b'OUT', b'Out station'), (b'EDU', b'Education')])),
                ('start', models.DateField()),
                ('end', models.DateField()),
                ('reason', models.TextField(max_length=200, null=True)),
                ('attachment', models.FileField(null=True, upload_to=leaveManagement.models.getLeaveAttachmentPath)),
                ('status', models.CharField(default=b'NA', max_length=2, choices=[(b'NA', b'Not processed'), (b'OK', b'Approved'), (b'RE', b'Rejected'), (b'AT', b'Need attention')])),
                ('approversComment', models.CharField(max_length=200, null=True)),
                ('approversID', models.CharField(max_length=30, null=True)),
                ('approvedOn', models.DateField(null=True)),
                ('adminApprover', models.CharField(max_length=30, null=True)),
                ('adminApproved', models.NullBooleanField()),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True)),
            ],
        ),
    ]
