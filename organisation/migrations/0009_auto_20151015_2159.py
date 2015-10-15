# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0008_auto_20151013_1734'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdesignation',
            name='rank',
            field=models.CharField(default=b'Not selected..', max_length=8, choices=[(b'Not Selected..', b'Not Selected..'), (b'Director', b'Director'), (b'Deputy Director', b'Deputy Director'), (b'Department Head', b'Department Head'), (b'Prof. InCharge', b'Prof. InCharge'), (b'Group Leader', b'Group Leader'), (b'Senior Scientist', b'Senior Scientist'), (b'Scientist', b'Scientist'), (b'Undergraduate Student', b'Undergraduate Student'), (b'Master Student', b'Master Student'), (b'PhD Candidate', b'PhD Candidate'), (b'Post Doctoral Candidate', b'Post Doctoral Candidate'), (b'Senior Engineer', b'Senior Engineer'), (b'Engineer', b'Engineer'), (b'Technician', b'Technician'), (b'General Staff', b'General Staff')]),
        ),
    ]
