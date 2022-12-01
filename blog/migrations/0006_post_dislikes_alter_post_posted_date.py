# Generated by Django 4.0.5 on 2022-06-14 00:48

import datetime
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('blog', '0005_alter_post_posted_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='dislikes',
            field=models.ManyToManyField(blank=True, related_name='post_dislikes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='post',
            name='posted_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 6, 13, 20, 48, 12, 863795)),
        ),
    ]
