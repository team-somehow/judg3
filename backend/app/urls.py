from django.urls import path
from .views import hello
from .views import auth
from .views import events, vote, leaderboard, apply, voters, projects, suggest

urlpatterns = [
    path("", hello.index, name="index"),

    path("auth/login/", auth.verify_world_id, name="login"),

    # event
    path('event/', events.create_event, name='create_event'),
    path('get-event/', events.get_all_events_with_status, name='get_event'),
    path('get-event-noauth/', events.get_all_events_noauth, name='get_event_no'),
    path('get-event-admin/', events.get_all_events_admin, name='get_event_admin'),
    path('event/<int:pk>/status', events.update_event_status,
         name='update_event_status'),

    # apply
    path('voter-apply-event/', apply.apply_event, name='apply_event'),
    path('voter-apply-status/<event_id>',
         apply.apply_status, name='apply_event'),

    # voters
    path('voters/<int:event_id>/', voters.get_voters, name='get_voters'),
    path('voters/update-status/', voters.update_voter_status,
         name='update_voter_status'),

    # project
    path('project', projects.create_project, name='create_project'),
    path('project/<int:id>/', projects.get_project, name='get_project'),

    # suggest
    path('suggest/<int:event_id>/', suggest.suggest, name='suggest'),

    path('vote', vote.create_vote, name="create_vote"),
    path('leaderboard', leaderboard.get_leaderboard, name="get_leaderboard")
]
