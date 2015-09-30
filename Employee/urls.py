from django.conf.urls import url, include
from . import views

urlpatterns = [

    url(r'^admin/', 'HR.views.admin', name='admin'),
    url(r'^home/', views.home, name='home'),
    url(r'^support/', views.support, name='support'),
    url(r'^payroll/', views.payroll, name='payroll'),
    url(r'^team/', views.team, name='team'),
    url(r'^learn/', views.learn, name='learn'),
    url(r'^business/', views.business, name='business'),
    url(r'^document/', views.document, name='document'),
    url(r'^project/', views.project, name='project'),
    url(r'^recruit/', views.recruit, name='recruit'),
]
