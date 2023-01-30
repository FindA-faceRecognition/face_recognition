from django.db import models

class Operator(models.Model):
    username=models.CharField(max_length=256)
    password=models.CharField(max_length=256)
    def __str__(self):
        return self.username
class Attendance(models.Model):
    name=models.CharField(max_length=256,blank=True)
    Day=models.CharField(max_length=256,blank=True)
    Time=models.CharField(max_length=256,blank=True)
    def __str__(self):
        return self.name
class Employee(models.Model):
    name=models.CharField(max_length=256,blank=True)
    date_of_birth=models.DateTimeField(blank=True,editable=True)
    image=models.ImageField(upload_to='images',blank=True)
    def __str__(self):
        return self.name
class Finda(models.Model):
    image=models.ImageField(upload_to='newimages')