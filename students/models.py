from django.db import models
from datetime import datetime
from django.utils import timezone


class Student(models.Model):
    name = models.CharField("Name", max_length=240)
    email = models.EmailField(max_length=254)
    document = models.CharField("Date",max_length=240)
    phone = models.CharField(max_length=20)
    upload = models.ImageField(upload_to = "uploads")
    registrationDate = models.DateTimeField(default=datetime.now, blank=True)



    def __str__(self):
        return self.name
