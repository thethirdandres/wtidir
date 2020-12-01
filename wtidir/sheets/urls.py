from django.urls import path

from . import views

app_name = 'sheets'

urlpatterns = [
    # path('', views.main_view, name='main_view'),
    path('inventory', views.inventory_view, name='inventory_view'),
    path('delivery', views.delivery_view, name='delivery_view'),
    path('transfer', views.transfer_view, name='transfer_view'),
    path('damage', views.damage_view, name='damage_view'),
    path('sold', views.sold_view, name='sold_view'),
    path('pettycash', views.pettycash_view, name='pettycash_view'),
    path('_delivery', views._delivery_view, name='_delivery_view'),
    path('_transfer', views._transfer_view, name='_transfer_view'),
    path('_damagereturn', views._damagereturn_view, name='_damagereturn_view'),
    path('_invoice', views._invoice_view, name='_invoice_view'),
]
