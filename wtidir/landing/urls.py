
from django.urls import path

from . import views

app_name = 'landing'

urlpatterns = [
    path('', views.landing_view, name='landing_view'),
    path('temptemp', views.temptemp_view, name='temptemp_view'),
    
]
