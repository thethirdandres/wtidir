import json
from django.shortcuts import render
from django.contrib import messages
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q

from .models import Area, Branch, AccountGroup, AccountUser, AccountUserArea, EmployeeGroup, ProductUOM, DiscountType, PaymentType, Device

def main_view(request):
    return render(request, 'repository_templates/repository.html')
# ~ ~ ~ ~ ~ User Page ~ ~ ~ ~ ~
def user_view(request):
    AccountGroups = AccountGroup.objects.filter(Status=1).order_by('-idAccountGroup')
    UserAccounts = AccountUser.objects.order_by('-idAccountUser')
    return render(request, 'repository_templates/user.html', {'AccountGroups' : AccountGroups, 'UserAccounts' : UserAccounts})

#User Account
@csrf_exempt
def user_account_add(request):
    try:
        user_account = AccountUser(AUUserName=request.POST.get('username'), AULastName=request.POST.get('lastname'), AUFirstName=request.POST.get('firstname'), AUMiddleName=request.POST.get('middlename'), AUPassword=request.POST.get('password'), AUEmail=request.POST.get('emailaddress'), idAccountGroup=request.POST.get('idgroup'), AGName=request.POST.get('groupname'))
        user_account.save() #<- Insert Data to mysql
        user_account_data = {"idAccountUser":user_account.idAccountUser , "AUUserName":user_account.AUUserName, "AULastName":user_account.AULastName , "AUFirstName":user_account.AUFirstName , "AUMiddleName":user_account.AUMiddleName , "AUPassword":user_account.AUPassword , "AUEmail":user_account.AUEmail , "idAccountGroup":user_account.idAccountGroup, "AGName":user_account.AGName, "error":False,"Message":"User Account has been Created Successfully"}
        # ^- Data to be returned after Inserting Successfully (JSON Format)
        return JsonResponse(user_account_data,safe=False)
    except (e):
        user_account_data = {"error":True,"Message":"Error Failed to Create User Account"}
        # ^- Data to be returned after Inserting Failed (JSON Format)
        return JsonResponse(user_account_data,safe=False)

@csrf_exempt
def user_account_update(request):
    try:
        user_account = AccountUser.objects.get(idAccountUser=request.POST.get('id'))
        user_account.AULastName  = request.POST.get('lastname')
        user_account.AUFirstName = request.POST.get('firstname')
        user_account.AUMiddleName  = request.POST.get('middlename')
        user_account.AUUserName  = request.POST.get('username')
        user_account.AUEmail = request.POST.get('emailaddress')
        user_account.idAccountGroup = request.POST.get('idgroupaccount')
        user_account.AGName = request.POST.get('groupname')
        user_account.save()
        user_account_data = {"error":True,"Message":"User Account has been Updated"}
        return JsonResponse(user_account_data,safe=False)
    except:
        user_account_data = {"error":True,"Message":"Error Failed to Update User Account"}
        return JsonResponse(user_account_data,safe=False)

@csrf_exempt
def user_account_deactivate(request):
    try:
        user_account = AccountUser.objects.get(idAccountUser=request.POST.get('id'))
        user_account.Status = 0
        user_account.save()
        user_account_data = {"error":True,"Message":"User Account has been Deactivated"}
        return JsonResponse(user_account_data,safe=False)
    except:
        user_account_data = {"error":True,"Message":"Error Failed to Deactivated User Account"}
        return JsonResponse(user_account_data,safe=False)

@csrf_exempt
def user_account_change_password(request):
    try:
        user_account = AccountUser.objects.get(idAccountUser=request.POST.get('id'))
        user_account.AUPassword = idAccountUser=request.POST.get('newpassword')
        user_account.save()
        user_account_data = {"error":True,"Message":"User Account Password has been Updated"}
        return JsonResponse(user_account_data,safe=False)
    except:
        user_account_data = {"error":True,"Message":"Error Failed to Update User Account Password"}
        return JsonResponse(user_account_data,safe=False)

@csrf_exempt
def user_account_area_access_init(request):
    useraccess = AccountUserArea.objects.filter(idAccountUser=request.POST.get('iduser')).values()
    areas = Area.objects.filter(Status=1).values()
    return JsonResponse({"useraccounts":list(useraccess), "areas":list(areas)}, safe=False)

@csrf_exempt
def user_account_area(request):
    user_account_area_data = {"error":False,"Message":"Default"}
    useraccess = AccountUserArea.objects.filter(idAccountUser=request.POST.get('iduser')).values()
    userAccessCount = AccountUserArea.objects.filter(Q(idAccountUser=request.POST.get('iduser')), Q(idArea=request.POST.get('idarea'))).count()

    if userAccessCount > 0:
        user_account_area = AccountUserArea.objects.get(Q(idAccountUser=request.POST.get('iduser')), Q(idArea=request.POST.get('idarea')))
        user_account_area.Status=int(request.POST.get('status'))
        user_account_area.save()
        user_account_area_data = {"error":False,"Message":"User Account Access has been Updated"}
    else:
        user_account_area = AccountUserArea(idAccountUser=request.POST.get('iduser'), idArea=request.POST.get('idarea'), AName=request.POST.get('namearea'), Status=int(request.POST.get('status')))
        user_account_area.save()
        user_account_area_data = {"error":False,"Message":"User Account Access has been Added"}
    return JsonResponse(user_account_area_data,safe=False)

# Group
@csrf_exempt
def user_group_add(request):
    try:
        AG = AccountGroup(AGName=request.POST.get('AGName'))
        AG.save() 
        AG_data = {"idAccountGroup":AG.idAccountGroup, "AGName":AG.AGName, "error":False,"Message":"Account Group has been Added Successfully"}
        return JsonResponse(AG_data,safe=False)
    except:
        AG_data = {"error":True,"Message":"Error Failed to Added Account Group"}
        return JsonResponse(AG_data,safe=False)

@csrf_exempt
def user_group_update(request):
    try:
        AG = AccountGroup.objects.get(idAccountGroup=request.POST.get('idAccountGroup'))
        AG.AGName = request.POST.get('AGName')
        AG.save() #<- Insert Data to mysql
        AG_data = {"error":True,"Message":"Account Group has been Updated"}
        # ^- Data to be returned after Inserting Successfully (JSON Format)
        return JsonResponse(AG_data,safe=False)
    except:
        AG_data = {"error":True,"Message":"Error Failed to Updated Account Group"}
        # ^- Data to be returned after Inserting Failed (JSON Format)
        return JsonResponse(AG_data,safe=False)

@csrf_exempt
def user_group_deactivate(request):
    try:
        AG = AccountGroup.objects.get(idAccountGroup=request.POST.get('idAccountGroup'))
        AG.Status = 0
        AG.save() #<- Insert Data to mysql
        AG_data = {"error":True,"Message":"Account Group has been Deactivated"}
        # ^- Data to be returned after Inserting Successfully (JSON Format)
        return JsonResponse(AG_data,safe=False)
    except:
        AG_data = {"error":True,"Message":"Error Failed to Deactivated Account Group"}
        # ^- Data to be returned after Inserting Failed (JSON Format)
        return JsonResponse(AG_data,safe=False)

@csrf_exempt
def user_group_list(request):
     accountgroups = AccountGroup.objects.filter(Status=1).values()
     areas = Area.objects.filter(Status=1).values()
     return JsonResponse({"AccountGroups":list(accountgroups), "areas":list(areas)}, safe=False)
# * * * * * User Page * * * * *
# ~ ~ ~ ~ ~ Area Page ~ ~ ~ ~ ~
def area_view(request): # <-This is to load the Necessary Data to be displayed in Repository Area Page.
    areas = Area.objects.filter(Status=1).order_by('-idArea')
    return render(request, 'repository_templates/area.html', {'areas' : areas})

@csrf_exempt
def area_add(request): # <-This is to Insert the Area into mysql. When Area has been Inserted successfully return Area Data to the Repository Area Page to be displayed.
    AName = request.POST.get('AName')                   # <-
    unBranchCommi = request.POST.get('unBranchCommi')       # <-
    ASAPSvr = request.POST.get('ASAPSvr')                       # <-
    ASAPUsr = request.POST.get('ASAPUsr')                           # <- Data passed from repository.js
    ASAPPwd = request.POST.get('ASAPPwd')                       # <-
    ASAPDB = request.POST.get('ASAPDB')                     # <-
    ASAPDataSource = request.POST.get('ASAPDataSource') # <-
    try:
        area = Area(AName=AName, unBranchCommi=unBranchCommi, ASAPSvr=ASAPSvr, ASAPUsr=ASAPUsr, ASAPPwd=ASAPPwd, ASAPDB=ASAPDB, ASAPDataSource=ASAPDataSource)
        area.save() #<- Insert Data to mysql
        # ^- Area Data to be returned after Inserting Successfully (JSON Format)
        area_data = {"idArea":area.idArea, "AName":area.AName, "unBranchCommi":area.unBranchCommi, "ASAPSvr":area.ASAPSvr, "ASAPUsr":area.ASAPUsr, "ASAPPwd":area.ASAPPwd, "ASAPDB":area.ASAPDB, "ASAPDataSource":area.ASAPDataSource, "error":False, "Message":"Area has been Added"}
        return JsonResponse(area_data,safe=False)
    except:
        area_data = {"error":True,"Message":"Error Failed to Added Area"}
        # ^- Area Data to be returned after Inserting Failed (JSON Format)
        return JsonResponse(area_data,safe=False)

@csrf_exempt
def area_update(request):
    try:
        area = Area.objects.get(idArea=request.POST.get('idArea')) # <- Query Specific Area Data to be edited/updated
        area.AName = request.POST.get('AName')
        area.ASAPSvr = request.POST.get('ASAPSvr')
        area.ASAPUsr = request.POST.get('ASAPUsr')
        area.ASAPPwd = request.POST.get('ASAPPwd')
        area.ASAPDB = request.POST.get('ASAPDB')
        area.ASAPDataSource = request.POST.get('ASAPDataSource')
        area.save() # <- Save Area Changes in mysql
        area_data={"error":False,"Message":"Area has been Updated"}
        # ^- Area Data to be returned after Updating Successfully (JSON Format)
        return JsonResponse(area_data,safe=False)
    except:
        area_data={"error":True,"Message":"Error Failed to Update Area"}
        # ^- Area Data to be returned after Updating Failed (JSON Format)
        return JsonResponse(area_data,safe=False)

@csrf_exempt
def area_delete(request): # <-This is to Deactivate the Area in mysql that means turn Area Status to 0
    idArea = request.POST.get('idArea') # <- Data passed from repository.js
    try:
        area = Area.objects.get(idArea=idArea)
        area.Status = 0
        area.save() #<- Save Data Changes to mysql
        area_data={"error":False,"Message":"Area has been Deleted"}
        # ^- Area Data to be returned after Deactivating Successfully (JSON Format)
        return JsonResponse(area_data,safe=False)
    except:
        area_data={"error":True,"Message":"Error Failed to Area"}
        # ^- Area Data to be returned after Deactivating Failed (JSON Format)
        return JsonResponse(area_data,safe=False)
# * * * * * Area Page * * * * *
# ~ ~ ~ ~ ~ Branch Page ~ ~ ~ ~ ~
def branch_view(request):
    areas = Area.objects.filter(Status=1).order_by('-idArea')
    branches = Branch.objects.filter(Status=1).order_by('-idBranch')
    BTypes = {'Office', 'Outlet', 'Commi'}
    return render(request, 'repository_templates/branch.html', {'branches' : branches, 'areas' : areas, 'BTypes': BTypes})

@csrf_exempt
def branch_add(request):
    try:
        branch = Branch(BName=request.POST.get('BName'), fkArea=request.POST.get('idArea'), AName=request.POST.get('AName'), TICName=request.POST.get('TICName'), TPBName=request.POST.get('TPBName'), BSAPCode=request.POST.get('BSAPCode'), BType=request.POST.get('BType'), BDescription=request.POST.get('BDescription'))
        branch.save() #<- Insert Data to mysql
        branch_data = {"idBranch":branch.idBranch, "BName":branch.BName, "fkArea":branch.fkArea, "AName":branch.AName, "TICName":branch.TICName, "TPBName":branch.TPBName, "BSAPCode":branch.BSAPCode, "BType":branch.BType, "BDescription":branch.BDescription, "error":False,"Message":"Branch has been Added Successfully"}
        # ^- Data to be returned after Inserting Successfully (JSON Format)
        return JsonResponse(branch_data,safe=False)
    except:
        branch_data = {"error":True,"Message":"Error Failed to Added Branch"}
        # ^- Data to be returned after Inserting Failed (JSON Format)
        return JsonResponse(branch_data,safe=False)

@csrf_exempt
def branch_update(request):
    try:
        branch = Branch.objects.get(idBranch=request.POST.get('idBranch'))
        branch.BName = request.POST.get('branchName')
        branch.AName = request.POST.get('branchArea')
        branch.TICName = request.POST.get('branchTICName')
        branch.TPBName = request.POST.get('branchTPBName')
        branch.BSAPCode = request.POST.get('branchBSAPCode')
        branch.BType = request.POST.get('branchBtype')
        branch.BDescription = request.POST.get('branchBDesc')
        branch.save()
        branch_data = {"error":True,"Message":"Branch has been updated"}
        return JsonResponse(branch_data,safe=False)
    except:
        branch_data = {"error":True,"Message":"Error Failed to update Branch"}
        return JsonResponse(branch_data,safe=False)

@csrf_exempt
def branch_deactivate(request):
    try:
        branch = Branch.objects.get(idBranch=request.POST.get('idBranch'))
        branch.Status = 0
        branch.save() #<- Insert Data to mysql
        branch_data = {"error":True,"Message":"Branch has been Deactivated"}
        # ^- Data to be returned after Inserting Successfully (JSON Format)
        return JsonResponse(branch_data,safe=False)
    except:
        branch_data = {"error":True,"Message":"Error Failed to Deactivated Branch"}
        # ^- Data to be returned after Inserting Failed (JSON Format)
        return JsonResponse(branch_data,safe=False)
# * * * * * Branch Page * * * * *
# ~ ~ ~ ~ ~ Employee Page ~ ~ ~ ~ ~
def employee_view(request):
    employee_groups = EmployeeGroup.objects.filter(Status=1).order_by('-idEmployeeGroup')
    return render(request, 'repository_templates/employee.html', {'employee_groups' : employee_groups})

@csrf_exempt
def employee_group_add(request):
    try:
        print(request.POST.get('emploGroupCredential'))       
        EG = EmployeeGroup(EGName=request.POST.get('emploGroupName'), EGLevel=request.POST.get('emploGroupCredential'))
        EG.save() 
        EG_data = {"idEmployeeGroup":EG.idEmployeeGroup, "EGName":EG.EGName, "EGLevel":EG.EGLevel, "error":False,"Message":"Employee Group has been Added Successfully"}
        return JsonResponse(EG_data,safe=False)
    except:
        EG_data = {"error":True,"Message":"Error Failed to Added Employee Group"}
        return JsonResponse(EG_data,safe=False)

@csrf_exempt
def employee_group_update(request):
    try:
        EG = EmployeeGroup.objects.get(idEmployeeGroup=request.POST.get('idEmploGroup'))
        EG.EGName = request.POST.get('emploGroupName')
        EG.EGLevel = request.POST.get('emploGroupCredential')
        EG.save()
        EG_data = {"error":True,"Message":"Employee Group has been Updated"}
        return JsonResponse(EG_data,safe=False)
    except:
        EG_data = {"error":True,"Message":"Error Failed to Update Employee Group"}
        return JsonResponse(EG_data,safe=False)

@csrf_exempt
def employee_group_deactivate(request):
    try:
        EG = EmployeeGroup.objects.get(idEmployeeGroup=request.POST.get('idEmploGroup'))
        EG.Status = 0
        EG.save() #<- Insert Data to mysql
        EG_data = {"error":True,"Message":"Employee Group has been Deactivated"}
        # ^- Data to be returned after Inserting Successfully (JSON Format)
        return JsonResponse(EG_data,safe=False)
    except:
        EG_data = {"error":True,"Message":"Error Failed to Deactivated Employee Group"}
        # ^- Data to be returned after Inserting Failed (JSON Format)
        return JsonResponse(EG_data,safe=False)

@csrf_exempt
def employee_group_list(request):
     emplogroups = EmployeeGroup.objects.filter(Status=1).values()
     return JsonResponse({"emplogroups":list(emplogroups)}, safe=False)

# * * * * * Employee Page * * * * *
# ~ ~ ~ ~ ~ UOM Page ~ ~ ~ ~ ~
def uom_view(request):
    PUOMS = ProductUOM.objects.filter(Status=1).order_by('-idProductUOM')
    return render(request, 'repository_templates/uom.html', {'PUOMS' : PUOMS})

@csrf_exempt
def ProductUOM_add(request):
    try:
        PUOM = ProductUOM(PUOMName=request.POST.get('PUOMName'))
        PUOM.save() 
        PUOM_data = {"idProductUOM":PUOM.idProductUOM, "PUOMName":PUOM.PUOMName, "error":False,"Message":"Product UOM has been Added Successfully"}
        return JsonResponse(PUOM_data,safe=False)
    except:
        PUOM_data = {"error":True,"Message":"Error Failed to Add Product UOM"}
        return JsonResponse(PUOM_data,safe=False)

@csrf_exempt
def ProductUOM_deactivate(request):
    try:
        PUOM = ProductUOM.objects.get(idProductUOM=request.POST.get('idPUOM'))
        PUOM.Status = 0
        PUOM.save()
        PUOM_data = {"error":True,"Message":"Product UOM has been Deactivated"}
        return JsonResponse(PUOM_data,safe=False)
    except:
        PUOM_data = {"error":True,"Message":"Error Failed to Deactivated Product UOM"}
        return JsonResponse(PUOM_data,safe=False)

@csrf_exempt
def ProductUOM_update(request):
    try:
        PUOM = ProductUOM.objects.get(idProductUOM=request.POST.get('idPUOM'))
        PUOM.PUOMName = request.POST.get('PUOMName')
        PUOM.save()
        PUOM_data = {"error":True,"Message":"Product UOM has been Updated"}
        return JsonResponse(PUOM_data,safe=False)
    except:
        PUOM_data = {"error":True,"Message":"Error Failed to Deactivated Product Updated"}
        return JsonResponse(PUOM_data,safe=False)
# * * * * * UOM Page * * * * *
# ~ ~ ~ ~ ~ Discount Type Page ~ ~ ~ ~ ~
def discounttype_view(request):
    DTS = DiscountType.objects.filter(Status=1).order_by('-idDiscountType')
    return render(request, 'repository_templates/discounttype.html', {'DTS': DTS})

@csrf_exempt
def DiscountTpye_add(request):
    try:
        DT = DiscountType(DTName=request.POST.get('DTName'), DTPercent=request.POST.get('DTPercent'), DTAmount=request.POST.get('DTAmount'), DTVatExempt=int(request.POST.get('DTVatExempt')))
        DT.save() 
        DT_data = {"idDiscountType":DT.idDiscountType, "DTName":DT.DTName, "DTPercent":DT.DTPercent, "DTAmount":DT.DTAmount, "DTVatExempt":DT.DTVatExempt,"error":False,"Message":"Product Discount Type has been Added Successfully"}
        return JsonResponse(DT_data,safe=False)
    except:
        DT_data = {"error":True,"Message":"Error Failed to Add Discount Type"}
        return JsonResponse(DT_data,safe=False)

@csrf_exempt
def DiscountType_deactivate(request):
    try:
        DT = DiscountType.objects.get(idDiscountType=request.POST.get('idDiscountType'))
        DT.Status = 0
        DT.save()
        DT_data = {"error":True,"Message":"Discount Type has been Deactivated"}
        return JsonResponse(DT_data,safe=False)
    except:
        DT_data = {"error":True,"Message":"Error Failed to Deactivated Discount Type"}
        return JsonResponse(DT_data,safe=False)

@csrf_exempt
def DiscountType_update(request):
    try:
        DT = DiscountType.objects.get(idDiscountType=request.POST.get('idDiscountType'))
        DT.DTName = request.POST.get('DTName')
        DT.DTPercent = request.POST.get('DTPercent')
        DT.DTAmount = request.POST.get('DTAmount')
        if request.POST.get('DTVatExempt'):
             DT.DTVatExempt = 1
        else:
            DT.DTVatExempt = 0
        DT.save()
        DT_data = {"error":True,"Message":"Discount Type has been updated"}
        return JsonResponse(DT_data,safe=False)
    except:
        DT_data = {"error":True,"Message":"Error Failed to update Discount Type"}
        return JsonResponse(DT_data,safe=False)
# * * * * * Discount Type Page * * * * *
# ~ ~ ~ ~ ~ Payment Type Page ~ ~ ~ ~ ~
def paymenttype_view(request):
    PTS = PaymentType.objects.filter(Status=1).order_by('-idPaymentType')
    return render(request, 'repository_templates/paymenttype.html', {'PTS': PTS})

@csrf_exempt
def PaymentType_add(request):
    try:
        PT = PaymentType(PTName=request.POST.get('PTName'), PTFixedAmount=request.POST.get('PTFixedAmount'))
        PT.save()
        PT_data = {"idPaymentType":PT.idPaymentType, "PTName":PT.PTName, "PTFixedAmount":PT.PTFixedAmount, "error":False,"Message":"Payment Type has been Added Successfully"}
        return JsonResponse(PT_data,safe=False)
    except:
        PT_data = {"error":True,"Message":"Error Failed to Add Payment Type"}
        return JsonResponse(PT_data,safe=False)

@csrf_exempt
def PaymentType_deactivate(request):
    try:
        PT = PaymentType.objects.get(idPaymentType=request.POST.get('idPaymentType'))
        PT.Status = 0
        PT.save()
        PT_data = {"error":True,"Message":"Payment Type has been Deactivated"}
        return JsonResponse(PT_data,safe=False)
    except:
        PT_data = {"error":True,"Message":"Error! Failed to Deactivate Payment Type"}
        return JsonResponse(PT_data,safe=False)

@csrf_exempt
def PaymentType_Update(request):
    try:
        PT = PaymentType.objects.get(idPaymentType=request.POST.get('idPaymentType'))
        PT.PTName = request.POST.get('PTName')
        PT.PTFixedAmount = request.POST.get('PTFixedAmount')
        PT.save()
        PT_data = {"error":True,"Message":"Payment Type has been Updated"}
        return JsonResponse(PT_data,safe=False)
    except:
        PT_data = {"error":True,"Message":"Error! Failed to Deactivate Payment Type"}
        return JsonResponse(PT_data,safe=False)
# * * * * * Payment Type Page * * * * *
# ~ ~ ~ ~ ~ Device Page ~ ~ ~ ~ ~
def device_view(request):
    branches = Branch.objects.filter(Status=1).order_by('-BName')
    areas = Area.objects.filter(Status=1).order_by('-AName')
    devices = Device.objects.filter(Status=1).order_by('-idDevice')
    return render(request, 'repository_templates/device.html', { 'branches': branches, 'areas': areas, 'devices': devices })

@csrf_exempt
def Device_add(request):
    try:
        _device = Device(DName=request.POST.get('DName'), idBranch=request.POST.get('idBranch'), BName=request.POST.get('BName'), 
                        idArea=request.POST.get('idArea'), AName=request.POST.get('AName'), DSerialNumber=request.POST.get('DSerialNumber'), 
                        DMacAddress=request.POST.get('DMacAddress'))
        _device.save()
        device_data = {"idDevice": _device.idDevice, "DName": _device.DName, "idBranch": _device.idBranch, "BName": _device.BName, "idArea": _device.idArea, 
                "AName": _device.AName, "DSerialNumber": _device.DSerialNumber, "DMacAddress": _device.DMacAddress, "error":False, "Message":"Device has been Added Successfully"}
        return JsonResponse(device_data,safe=False)
    except Exception as e:
        print("Hey! I Found an Error:", e)
        device_data = {"error":True,"Message": "Error Failed to Add Device"}       
        return JsonResponse(device_data,safe=False)

@csrf_exempt
def Device_deactivate(request):
    try:
        _device = Device.objects.get(idDevice=request.POST.get('idDevice'))
        _device.Status = 0
        _device.save()
        device_data = {"error":True,"Message":"Device has been Deactivated"}
        return JsonResponse(device_data,safe=False)
    except Exception as e:
        print("Hey! I Found an Error:", e)
        device_data = {"error":True,"Message":"Error! Failed to Deactivate Device"}
        return JsonResponse(device_data,safe=False)
# * * * * * Device Page * * * * *

def item_view(request):
    return render(request, 'repository_templates/item.html')