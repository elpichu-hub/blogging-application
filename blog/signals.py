# from django.db.models.signals import post_save
# from django.contrib.auth.models import User
# from django.dispatch import receiver
# from .models import Profile

# # When an instance of the user model is created a signal
# # is sent and creates a Profile instance related to the user.
# @receiver(post_save, sender=User)
# def create_signal(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_signal(sender, instance, **kwargs):
#     instance.profile.save()

from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile

@receiver(post_save, sender=User)
def create_and_save_profile(sender, instance, created, **kwargs):
    if created:
        # Create the Profile instance and save it
        profile = Profile.objects.create(user=instance)
        profile.save()