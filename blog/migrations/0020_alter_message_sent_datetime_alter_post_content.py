# Generated by Django 4.0.5 on 2022-10-11 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0019_alter_message_sent_datetime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='sent_datetime',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.CharField(max_length=1000),
        ),
    ]
