# Generated by Django 5.1.3 on 2024-11-07 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('memory', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memory',
            name='descript',
            field=models.TextField(blank=True, max_length=100000),
        ),
    ]
