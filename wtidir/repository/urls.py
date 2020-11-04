
from django.urls import path

from . import views

app_name = 'repository'

urlpatterns = [
    path('', views.main_view, name='main_view'),
    path('user', views.user_view, name="user_view"),
    path('area', views.area_view, name="area_view"),
    path('branch', views.branch_view, name="branch_view"),
    path('employee', views.employee_view, name="employee_view"),
    path('uom', views.uom_view, name="uom_view"),
    path('item', views.item_view, name="item_view"),
    #Me, Myself and I
    path('area_add', views.area_add, name="area_add"),
    path('area_update/<int:id>', views.area_update, name="area_update"),
    path('area_delete/<int:id>', views.area_delete, name="area_delete"),
]
