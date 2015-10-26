# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import social.models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0008_posthistory'),
    ]

    operations = [
        migrations.AddField(
            model_name='posthistory',
            name='attachment',
            field=models.FileField(null=True, upload_to=social.models.getPostAttachmentPath),
        ),
    ]
