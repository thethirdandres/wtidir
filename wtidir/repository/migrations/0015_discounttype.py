# Generated by Django 2.0 on 2021-02-09 01:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('repository', '0014_productuom'),
    ]

    operations = [
        migrations.CreateModel(
            name='DiscountType',
            fields=[
                ('idDiscountType', models.AutoField(primary_key=True, serialize=False)),
                ('DTName', models.CharField(blank=True, default='', max_length=50, null=True)),
                ('DTPercent', models.DecimalField(decimal_places=2, default=0.0, max_digits=6)),
                ('DTAmount', models.DecimalField(decimal_places=2, default=0.0, max_digits=6)),
                ('DTVatExempt', models.BooleanField(default=True)),
                ('TimeStamp', models.DateTimeField(auto_now_add=True)),
                ('Status', models.BooleanField(default=True)),
            ],
        ),
    ]
