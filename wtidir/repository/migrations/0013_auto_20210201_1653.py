# Generated by Django 2.0 on 2021-02-01 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('repository', '0012_employeegroup'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employeegroup',
            name='EGLevel',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]