# Generated by Django 2.0 on 2020-10-27 09:07

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Branch',
            fields=[
                ('idBranch', models.AutoField(primary_key=True, serialize=False)),
                ('unBranch', models.IntegerField(blank=True, default=0, null=True)),
                ('unArea', models.IntegerField(blank=True, default=0, null=True)),
                ('unTemplateItemControl', models.IntegerField(blank=True, default=0, null=True)),
                ('unTemplateProductionBatch', models.IntegerField(blank=True, default=0, null=True)),
                ('BName', models.CharField(blank=True, default='', max_length=150, null=True)),
                ('BDescription', models.CharField(blank=True, default='', max_length=150, null=True)),
                ('BSAPCode', models.CharField(blank=True, default='', max_length=20, null=True)),
                ('BType', models.IntegerField(blank=True, default=0, null=True)),
                ('BQuotaInterval', models.DecimalField(blank=True, decimal_places=4, default=0.0, max_digits=8, null=True)),
                ('BQuota', models.DecimalField(blank=True, decimal_places=4, default=0.0, max_digits=8, null=True)),
                ('BQuotaPointAmount', models.DecimalField(blank=True, decimal_places=4, default=0.0, max_digits=8, null=True)),
                ('TimeStamp', models.DateTimeField(blank=True, default=datetime.datetime.now)),
                ('Status', models.BooleanField(default=True)),
            ],
        ),
    ]
