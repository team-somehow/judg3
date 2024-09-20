from django.urls import path
from .views import hello
from .views import auth

urlpatterns = [
    path("", hello.index, name="index"),

    path("auth/login/", auth.verify_world_id, name="login"),
]
