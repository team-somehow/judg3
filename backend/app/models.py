from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

# auth


class UserManager(BaseUserManager):
    def create_user(self, world_id_user_hash):
        user = self.model(world_id_user_hash=world_id_user_hash)
        user.save(using=self._db)
        return user

    def create_superuser(self, world_id_user_hash):
        user = self.create_user(world_id_user_hash)
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    world_id_user_hash = models.CharField(max_length=255, unique=True)
    is_verified = models.BooleanField(
        default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'world_id_user_hash'

# events


class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    photo = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Active')

    def __str__(self):
        return self.name


# projects


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    url = models.URLField()
    photo = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)


