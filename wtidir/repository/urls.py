
from django.urls import path

from . import views

app_name = 'repository'

urlpatterns = [
    path('', views.main_view, name='main_view'),
    path('user', views.user_view, name="user_view"),
    path('area', views.area_view, name="area_view"),
    path('branch', views.branch_view, name="branch_view"),
    path('employee', views.employee_view, name="employee_view"),
    path('device', views.device_view, name="device_view"),
    path('paymenttype', views.paymenttype_view, name="paymenttype_view"),
    path('discounttype', views.discounttype_view, name="discounttype_view"),
    path('uom', views.uom_view, name="uom_view"),
    path('item', views.item_view, name="item_view"),
    #Me, Myself and I
    #User
    path('user_group_add', views.user_group_add, name="user_group_add"),
    path('user_group_deactivate', views.user_group_deactivate, name="user_group_deactivate"),
    path('user_group_update', views.user_group_update, name="user_group_update"),
    path('user_group_list', views.user_group_list, name="user_group_list"),
    path('user_account_add', views.user_account_add, name="user_account_add"),
    path('user_account_deactivate', views.user_account_deactivate, name="user_account_deactivate"),
    path('user_account_update', views.user_account_update, name="user_account_update"),
    path('user_account_change_password', views.user_account_change_password, name="user_account_change_password"),
    path('user_account_area', views.user_account_area, name="user_account_area"),
    path('user_account_area_access_init', views.user_account_area_access_init, name="user_account_area_access_init"),
    #Area
    path('area_add', views.area_add, name="area_add"),
    path('area_update', views.area_update, name="area_update"),
    path('area_delete', views.area_delete, name="area_delete"),
    #Branch
    path('branch_add', views.branch_add, name="branch_add"),
    path('branch_deactivate', views.branch_deactivate, name="branch_deactivate"),
    path('branch_update', views.branch_update, name="branch_update"),
    #Employee
    path('employee_add', views.employee_add, name="employee_add"),
    path('employee_update', views.employee_update, name="employee_update"),
    path('user_employee_change_password', views.user_employee_change_password, name="user_employee_change_password"),
    path('employee_area_access_init', views.employee_area_access_init, name="employee_area_access_init"),
    path('employee_area_access', views.employee_area_access, name="employee_area_access"),
    path('employee_deactivate', views.employee_deactivate, name="employee_deactivate"),
    path('employee_group_add', views.employee_group_add, name="employee_group_add"),
    path('employee_group_deactivate', views.employee_group_deactivate, name="employee_group_deactivate"),
    path('employee_group_update', views.employee_group_update, name="employee_group_update"),
    path('employee_group_list', views.employee_group_list, name="employee_group_list"),
    #Product UOM
    path('ProductUOM_add', views.ProductUOM_add, name="ProductUOM_add"),
    path('ProductUOM_deactivate', views.ProductUOM_deactivate, name="ProductUOM_deactivate"),
    path('ProductUOM_update', views.ProductUOM_update, name="ProductUOM_update"),
    #Discount Type
    path('DiscountTpye_add', views.DiscountTpye_add, name="DiscountTpye_add"),
    path('DiscountType_deactivate', views.DiscountType_deactivate, name="DiscountType_deactivate"),
    path('DiscountType_update', views.DiscountType_update, name="DiscountType_update"),
    #Payment Type
    path('PaymentType_add', views.PaymentType_add, name="PaymentType_add"),
    path('PaymentType_deactivate', views.PaymentType_deactivate, name="PaymentType_deactivate"),
    path('PaymentType_Update', views.PaymentType_Update, name="PaymentType_Update"),
    #Device
    path('Device_add', views.Device_add, name="Device_add"),
    path('Device_deactivate', views.Device_deactivate, name="Device_deactivate"),
    path('Device_update', views.Device_update, name="Device_update"),
    path('Device_branch_and_area_list', views.Device_branch_and_area_list, name="Device_branch_and_area_list"),
    #Items
    path('Item_add', views.Item_add, name="Item_add"),
]
