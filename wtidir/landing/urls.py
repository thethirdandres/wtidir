
from django.urls import path

from . import views

app_name = 'landing'

urlpatterns = [
    # path('', views.login_view, name='login_view'),
    path('', views.landing_view, name='landing_view'),
    
]
