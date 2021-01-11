import json
from django.shortcuts import render
from django.contrib import messages
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Area, Branch, AccountGroup

def main_view(request):
    return render(request, 'repository_templates/repository.html')
# ~ ~ ~ ~ ~ User Page ~ ~ ~ ~ ~
def user_view(request):
    AccountGroups = AccountGroup.objects.filter(Status=1).order_by('-idAccountGroup')
    return render(request, 'repository_templates/user.html', {'AccountGroups' : AccountGroups})

# Group
@csrf_exempt
def user_group_add(request):
    try:
        AG = AccountGroup(AGName=request.POST.get('AGName'))
        AG.save() #<- Insert Data to mysql
        AG_data = {"idAccountGroup":AG.idAccountGroup, "AGName":AG.AGName, "error":False,"Message":"Account Group has been Added Successfully"}
        # ^- Data to be returned after Inserting Successfully (JSON Format)
        return JsonResponse(AG_data,safe=False)
    except:
        AG_data = {"error":True,"Message":"Error Failed to Added Account Group"}
        # ^- Data to be returned after Inserting Failed (JSON Format)
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
    return render(request, 'repository_templates/branch.html', {'branches' : branches, 'areas' : areas})

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
# * * * * * Branch Page * * * * *

def employee_view(request):
    return render(request, 'repository_templates/employee.html')

def device_view(request):
    return render(request, 'repository_templates/device.html')

def paymenttype_view(request):
    return render(request, 'repository_templates/paymenttype.html')

def discounttype_view(request):
    return render(request, 'repository_templates/discounttype.html')

def uom_view(request):
    return render(request, 'repository_templates/uom.html')

def item_view(request):
    return render(request, 'repository_templates/item.html')