
from django.urls import path

from . import views

app_name = 'repository'

urlpatterns = [
    path('', views.main_view, name='main_view'),
    path('user', views.user_view, name="user_view"),
    path('area', views.area_view, name="area_view"),
    path('branch', views.branch_view, name="branch_view"),
]
