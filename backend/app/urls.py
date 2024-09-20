from django.urls import path
from .views import hello
from .views import auth
from .views import events, vote, leaderboard

urlpatterns = [
    path("", hello.index, name="index"),

    path("auth/login/", auth.verify_world_id, name="login"),

    # event
    path('event/', events.create_event, name='create_event'),
    path('get-event/', events.get_all_events_with_status, name='get_event'),
    path('get-event-noauth/', events.get_all_events_noauth, name='get_event'),

    path('vote/', vote.create_vote, name="create_vote"),
    path('leaderboard/', leaderboard.get_leaderboard, name="get_leaderboard")
]
