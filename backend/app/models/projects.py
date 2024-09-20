from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    url = models.URLField()
    photo_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('User', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
