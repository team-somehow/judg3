from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

# auth


class UserManager(BaseUserManager):
    def create_user(self, world_id_user_hash, password=None, **extra_fields):
        """
        Creates and saves a User with the given world_id_user_hash and password.
        """
        if not world_id_user_hash:
            raise ValueError("The world_id_user_hash field must be set")

        user = self.model(
            world_id_user_hash=world_id_user_hash, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, world_id_user_hash, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given world_id_user_hash and password.
        """
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')

        return self.create_user(world_id_user_hash, password, **extra_fields)


class User(AbstractBaseUser):
    world_id_user_hash = models.CharField(max_length=255, unique=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)  # Add this
    is_staff = models.BooleanField(default=False)  # Add this

    objects = UserManager()

    USERNAME_FIELD = 'world_id_user_hash'

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

# events


class Event(models.Model):
    STATUS_CHOICES = [
        ('voters', 'Voters'),
        ('project', 'Project Submission'),
        ('active', 'Voting Active'),
        ('complete', 'Completed'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    photo = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=50, choices=STATUS_CHOICES, default='voters')
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# projects


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    url = models.URLField()
    photo = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)


# voter application


class Application(models.Model):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Accepted', 'Accepted'),
        ('Rejected', 'Rejected'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='Pending')

    def __str__(self):
        return f"{self.user} - {self.event} - {self.status}"

# Voting Model


class Vote(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    voter = models.ForeignKey(User, on_delete=models.CASCADE)
    project1 = models.ForeignKey(
        Project, related_name='project1_votes', on_delete=models.CASCADE)
    project2 = models.ForeignKey(
        Project, related_name='project2_votes', on_delete=models.CASCADE)
    winner = models.ForeignKey(
        Project, related_name='winning_votes', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.voter} voted for {self.winner} in {self.event}"

# Project Matchup Model


class ProjectMatchup(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    project1 = models.ForeignKey(
        Project, related_name='matchup_project1', on_delete=models.CASCADE)
    project2 = models.ForeignKey(
        Project, related_name='matchup_project2', on_delete=models.CASCADE)
    project1_wins = models.IntegerField(default=0)
    project2_wins = models.IntegerField(default=0)

    class Meta:
        unique_together = ('event', 'project1', 'project2')

# User Pairing Model


class UserPairing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    project1 = models.ForeignKey(
        Project, related_name='pairing_project1', on_delete=models.CASCADE)
    project2 = models.ForeignKey(
        Project, related_name='pairing_project2', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'event', 'project1', 'project2')
