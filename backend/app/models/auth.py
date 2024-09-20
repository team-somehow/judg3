from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


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
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'world_id_user_hash'
