from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Session(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=999)
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions')
    cost = models.IntegerField()
    date = models.DateField()

    def __str__(self):
        return self.title
