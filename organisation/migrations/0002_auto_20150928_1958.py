# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userdesignation',
            old_name='name',
            new_name='designation',
        ),
        migrations.AddField(
            model_name='userdesignation',
            name='department',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='userdesignation',
            name='domain',
            field=models.CharField(default=b'NA', max_length=15, choices=[(b'NA', b'Not Assigned'), (b'AUTO', b'Automotive'), (b'SERVICE', b'Service'), (b'RND', b'University'), (b'FMCG', b'FMCG'), (b'POWER', b'Power'), (b'PHARMA', b'Pharmaceuticals'), (b'MANUFAC', b'Manufacturing'), (b'TELE', b'Tele Communications')]),
        ),
        migrations.AddField(
            model_name='userdesignation',
            name='domainType',
            field=models.CharField(default=b'NOT', max_length=3, choices=[(b'NOT', b'Not selected..'), (b'RND', b'Research and Development'), (b'OPE', b'Operational'), (b'MAN', b'Management')]),
        ),
        migrations.AddField(
            model_name='userdesignation',
            name='group',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='userdesignation',
            name='rank',
            field=models.CharField(default=b'NOTSELEC', max_length=8, choices=[(b'NOTSELEC', b'Not Selected..'), (b'DIRECTOR', b'Director'), (b'DEPDIREC', b'Deputy Director'), (b'DEPAHEAD', b'Department Head'), (b'PROFINCH', b'Prof. InCharge'), (b'GROUPLEA', b'Group Leader'), (b'SENSCIEN', b'Senior Scientist'), (b'SCIENTIS', b'Scientist'), (b'UNDERGRA', b'Undergraduate Student'), (b'MASTERST', b'Master Student'), (b'PHDSTUDE', b'PhD Candidate'), (b'POSTDOCS', b'Post Doctoral Candidate'), (b'SENIOREN', b'Senior Engineer'), (b'ENGNIEER', b'Engineer'), (b'TECHNICI', b'Technician'), (b'GETSTAFF', b'General Staff')]),
        ),
        migrations.AddField(
            model_name='userdesignation',
            name='subGroup',
            field=models.CharField(max_length=30, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='userdesignation',
            name='team',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='userdesignation',
            name='unit',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
