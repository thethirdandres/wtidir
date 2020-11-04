from django.urls import path

from . import views

app_name = 'sheets'

urlpatterns = [
    # path('', views.main_view, name='main_view'),
    path('inventory', views.inventory_view, name='inventory_view'),
    path('delivery', views.delivery_view, name='delivery_view'),
    path('transfer', views.transfer_view, name='transfer_view'),
]
