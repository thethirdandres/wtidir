# Generated by Django 2.0 on 2021-02-16 01:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('repository', '0017_paymenttype'),
    ]

    operations = [
        migrations.CreateModel(
            name='Device',
            fields=[
                ('idDevice', models.AutoField(primary_key=True, serialize=False)),
                ('idBranch', models.IntegerField(default=0)),
                ('idArea', models.IntegerField(default=0)),
                ('unDevice', models.CharField(blank=True, default='', max_length=10, null=True)),
                ('DSerialNumber', models.CharField(blank=True, default='', max_length=50, null=True)),
                ('DMacAddress', models.CharField(blank=True, default='', max_length=50, null=True)),
                ('DName', models.CharField(blank=True, default='', max_length=50, null=True)),
                ('TimeStamp', models.DateTimeField(auto_now_add=True)),
                ('Status', models.BooleanField(default=True)),
            ],
        ),
    ]
