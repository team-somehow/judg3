from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    photo = models.ImageField(upload_to='event_photos/')
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Active')

    def __str__(self):
        return self.name
