# Generated by Django 3.2.16 on 2023-01-27 15:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('HFFRONTENDDJ', '0002_alter_finda_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='finda',
            name='name',
        ),
    ]
