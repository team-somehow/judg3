from django.contrib import admin
from .models import User, Event, Project, Application, Vote, ProjectMatchup, UserPairing

admin.site.register(User)
admin.site.register(Event)
admin.site.register(Project)
admin.site.register(Application)
admin.site.register(Vote)
admin.site.register(ProjectMatchup)
admin.site.register(UserPairing)
