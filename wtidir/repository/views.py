import json
from django.shortcuts import render
from django.contrib import messages
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Area, Branch

def main_view(request):
    return render(request, 'repository_templates/repository.html')

def user_view(request):
    return render(request, 'repository_templates/user.html')

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
        area_data = {"idArea" : area.idArea, "AName" : area.AName, "unBranchCommi" : area.unBranchCommi, "ASAPSvr" : area.ASAPSvr, "ASAPUsr" : area.ASAPUsr, "ASAPPwd" : area.ASAPPwd, "ASAPDB" : area.ASAPDB, "ASAPDataSource" : area.ASAPDataSource,"error":False,"Message":"Area has been Added Successfully"}
        # ^- Area Data to be returned after Inserting Successfully (JSON Format)
        return JsonResponse(area_data,safe=False)
    except:
        area_data = {"error":True,"Message":"Error Failed to Added Area"}
        # ^- Area Data to be returned after Inserting Failed (JSON Format)
        return JsonResponse(area_data,safe=False)

@csrf_exempt
def area_update(request, id):
    data=request.POST.get("data") # <- Data passed from repository.js
    dict_data=json.loads(data) # <- Parse JSON Array Data into Single Data
    try:
        area = Area.objects.get(idArea=dict_data['idArea']) # <- Query Specific Area Data to be edited/updated
        area.AName=dict_data['AName']
        area.ASAPSvr=dict_data['ASAPSvr']
        area.ASAPUsr=dict_data['ASAPUsr']
        area.ASAPPwd=dict_data['ASAPPwd']
        area.ASAPDB=dict_data['ASAPDB']
        area.ASAPDataSource=dict_data['ASAPDataSource']
        user_account.save() # <- Save Area Changes in mysql
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

def branch_view(request):
    all_branches = Branch.objects.filter(Status=1).order_by('-idBranch')
    return render(request, 'repository_templates/branch.html', {'all_branches' : all_branches})

def branch_add(request):
    return HttpResponseRedirect("/repository/branch")

def employee_view(request):
    return render(request, 'repository_templates/employee.html')

def uom_view(request):
    return render(request, 'repository_templates/uom.html')

def item_view(request):
    return render(request, 'repository_templates/item.html')