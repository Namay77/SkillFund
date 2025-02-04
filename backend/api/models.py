import datetime
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class Session(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=999)
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions')
    instructor_name = models.CharField(max_length=100, blank=True, null=True)
    cost = models.IntegerField()
    date = models.DateField()
    time = models.TimeField()
    duration = models.DurationField(default=datetime.timedelta(minutes=60))
    capacity = models.IntegerField(default=1)
    registrations = models.ManyToManyField(User, related_name='registered_sessions', blank=True)

    def clean(self):
        if self.pk and self.registrations.count() > self.capacity:
            raise ValidationError("Registrations cannot exceed session capacity.")

    def save(self, *args, **kwargs):
        self.clean()
        if self.instructor:
            self.instructor_name = self.instructor.username
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
