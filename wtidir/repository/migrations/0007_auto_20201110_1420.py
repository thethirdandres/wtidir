# Generated by Django 2.0 on 2020-11-10 06:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('repository', '0006_auto_20201103_1057'),
    ]

    operations = [
        migrations.CreateModel(
            name='TemplateProductionBatch',
            fields=[
                ('idTPB', models.AutoField(primary_key=True, serialize=False)),
                ('fkArea', models.IntegerField(blank=True, default=0, null=True)),
                ('fkTIC', models.IntegerField(blank=True, default=0, null=True)),
                ('AName', models.CharField(blank=True, default='', max_length=30, null=True)),
                ('TICName', models.CharField(blank=True, default='', max_length=30, null=True)),
                ('TPBName', models.CharField(blank=True, default='', max_length=45, null=True)),
                ('TimeStamp', models.DateTimeField(blank=True, default=datetime.datetime(2020, 11, 10, 14, 19, 50, 393563))),
                ('Status', models.BooleanField(default=True)),
            ],
        ),
        migrations.RenameField(
            model_name='templateitemcontrol',
            old_name='unArea',
            new_name='fkArea',
        ),
        migrations.RenameField(
            model_name='templateitemcontrol',
            old_name='idTemplateItemControl',
            new_name='idTIC',
        ),
        migrations.RemoveField(
            model_name='templateitemcontrol',
            name='unTemplateItemControl',
        ),
        migrations.AddField(
            model_name='templateitemcontrol',
            name='AName',
            field=models.CharField(blank=True, default='', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='area',
            name='TimeStamp',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 11, 10, 14, 19, 50, 393563)),
        ),
        migrations.AlterField(
            model_name='branch',
            name='TimeStamp',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 11, 10, 14, 19, 50, 393563)),
        ),
        migrations.AlterField(
            model_name='templateitemcontrol',
            name='TimeStamp',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 11, 10, 14, 19, 50, 393563)),
        ),
    ]
