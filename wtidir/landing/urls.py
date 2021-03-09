
from django.urls import path

from . import views

app_name = 'landing'

urlpatterns = [
    path('', views.splash_view, name='splash_view'),
    path('login', views.login_view, name='login_view'),
    path('landing', views.landing_view, name='landing_view'),
    
]
