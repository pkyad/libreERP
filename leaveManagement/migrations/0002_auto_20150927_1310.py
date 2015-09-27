# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('leaveManagement', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='leaveCompensation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('compensatingFor', models.DateField(null=True)),
                ('compensatedOn', models.DateField(null=True)),
                ('mode', models.CharField(default=b'OVE', max_length=3, choices=[(b'WFH', b'Work from home'), (b'WEE', b'Weekend'), (b'OVE', b'Over time')])),
                ('contribution', models.TextField(max_length=1000)),
                ('status', models.CharField(default=b'NA', max_length=2, choices=[(b'NA', b'Not processed'), (b'OK', b'Approved'), (b'RE', b'Rejected'), (b'AT', b'Need attention')])),
                ('approver', models.CharField(max_length=20, null=True)),
                ('approversComment', models.CharField(max_length=200, null=True)),
                ('approvedOn', models.DateField(null=True)),
                ('adminStatus', models.CharField(default=b'NA', max_length=2, choices=[(b'NA', b'Not processed'), (b'OK', b'Approved'), (b'RE', b'Rejected'), (b'AT', b'Need attention')])),
                ('adminApprover', models.CharField(max_length=20, null=True)),
                ('adminsComment', models.CharField(max_length=200, null=True)),
                ('adminApprovedOn', models.DateField(null=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='leaveapplication',
            name='adminApproved',
        ),
        migrations.RemoveField(
            model_name='leaveapplication',
            name='approversID',
        ),
        migrations.AddField(
            model_name='leaveapplication',
            name='adminApprovedOn',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='leaveapplication',
            name='adminStatus',
            field=models.CharField(default=b'NA', max_length=2, choices=[(b'NA', b'Not processed'), (b'OK', b'Approved'), (b'RE', b'Rejected'), (b'AT', b'Need attention')]),
        ),
        migrations.AddField(
            model_name='leaveapplication',
            name='adminsComment',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='leaveapplication',
            name='approver',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='leaveapplication',
            name='adminApprover',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
