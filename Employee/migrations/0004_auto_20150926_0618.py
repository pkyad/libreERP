# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import Employee.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Employee', '0003_remove_userprofile_email3'),
    ]

    operations = [
        migrations.CreateModel(
            name='calenderItem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('eventType', models.CharField(default=b'NONE', max_length=4, choices=[(b'NONE', b'Not Available'), (b'MEET', b'Meeting'), (b'REMI', b'Reminder'), (b'TODO', b'ToDo'), (b'EVEN', b'EVENT'), (b'DEAD', b'Deadline'), (b'OTHE', b'Other')])),
                ('originator', models.CharField(max_length=20, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('text', models.CharField(max_length=200, null=True)),
                ('when', models.DateTimeField(null=True)),
                ('checked', models.BooleanField(default=False)),
                ('deleted', models.BooleanField(default=False)),
                ('completed', models.BooleanField(default=False)),
                ('canceled', models.BooleanField(default=False)),
                ('level', models.CharField(default=b'NOR', max_length=3, choices=[(b'NOR', b'Normal'), (b'CRI', b'Critical'), (b'OPT', b'Optional'), (b'MAN', b'Mandatory')])),
                ('venue', models.CharField(max_length=50)),
                ('attachment', models.FileField(null=True, upload_to=Employee.models.getCalendarAttachment)),
                ('myNotes', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='chatMessage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('message', models.CharField(max_length=200, null=True)),
                ('attachment', models.FileField(null=True, upload_to=Employee.models.getChatMessageAttachment)),
                ('originator', models.CharField(max_length=20, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('read', models.BooleanField(default=False)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='mailMessage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('message', models.CharField(max_length=4000, null=True)),
                ('subject', models.CharField(max_length=200, null=True)),
                ('attachments', models.FileField(null=True, upload_to=Employee.models.getMailMessageAttachment)),
                ('originator', models.CharField(max_length=20, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('read', models.BooleanField(default=False)),
                ('CCd', models.CharField(max_length=300, null=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='notification',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('message', models.CharField(max_length=200, null=True)),
                ('link', models.URLField(max_length=100, null=True)),
                ('shortInfo', models.CharField(max_length=30, null=True)),
                ('read', models.BooleanField(default=False)),
                ('domain', models.CharField(max_length=20, null=True)),
                ('originator', models.CharField(max_length=20, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='calenderitem',
            name='notification',
            field=models.ForeignKey(to='Employee.notification'),
        ),
        migrations.AddField(
            model_name='calenderitem',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
    ]
