import datetime
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from django.dispatch import receiver

class Session(models.Model):
    GENDER_CHOICES = [
        ('None', 'None'),
        ('Male', 'Only Males'),
        ('Female', 'Only Females'),
    ]

    title = models.CharField(max_length=100)
    description = models.CharField(max_length=999)
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions')
    instructor_name = models.CharField(max_length=100, blank=True, null=True)
    cost = models.IntegerField()
    date = models.DateField()
    time = models.TimeField()
    duration = models.DurationField(default=datetime.timedelta(minutes=60))
    capacity = models.IntegerField(default=1)
    gender_preferences = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES,
        default='None'
    )
    registrations = models.ManyToManyField(User, related_name='registered_sessions', blank=True)

    def clean(self):
        if self.pk and self.registrations.count() > self.capacity:
            raise ValidationError("Registrations cannot exceed session capacity.")

    def save(self, *args, **kwargs):
        self.clean()
        if self.instructor:
            self.instructor_name = self.instructor.get_username()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"
