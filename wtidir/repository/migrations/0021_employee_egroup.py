# Generated by Django 2.0.7 on 2021-02-22 04:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('repository', '0020_employee'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='EGroup',
            field=models.CharField(blank=True, default='', max_length=25, null=True),
        ),
    ]