# Generated by Django 4.0.5 on 2022-06-07 00:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_alter_post_posted_date_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='posted_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 6, 6, 20, 13, 16, 78661)),
        ),
    ]
