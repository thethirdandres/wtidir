
from django.urls import path

from . import views

app_name = 'repository'

urlpatterns = [
    path('', views.main_view, name='main_view'),
    
]
