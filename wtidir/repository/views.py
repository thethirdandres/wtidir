from django.shortcuts import render
from django.contrib import messages
from django.http import HttpResponse, HttpResponseRedirect

from .models import Area, Branch
# Create your views here.
def main_view(request):
    return render(request, 'repository_templates/repository.html')

def user_view(request):
    return render(request, 'repository_templates/user.html')

#Area Start \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
def area_view(request):   
    all_areas = Area.objects.filter(Status=1).order_by('-idArea')
    return render(request, 'repository_templates/area.html', {'all_areas' : all_areas})

def area_add(request):
    if request.method == "POST":       
        areadata=Area()
        areadata.AName = request.POST['area']
        areadata.unBranchCommi = request.POST.get('commissary')
        areadata.ASAPSvr = request.POST['server']
        areadata.ASAPUsr = request.POST['user']
        areadata.ASAPPwd = request.POST['password']
        areadata.ASAPDB = request.POST['database']
        areadata.ASAPDataSource = request.POST['datasource']
        areadata.save()
        print("-Area has been saved successfully")
    return HttpResponseRedirect("/repository/area")

def area_update(request, id):
    if request.method == "POST":
        areadata=Area.objects.get(idArea=id)
        areadata.AName = request.POST.get("AName")
        areadata.unBranchCommi = request.POST.get("unBranchCommi")
        areadata.ASAPSvr = request.POST.get("ASAPSvr")
        areadata.ASAPUsr = request.POST.get("ASAPUsr")
        areadata.ASAPSvr = request.POST.get("ASAPSvr")
        areadata.ASAPPwd = request.POST.get("ASAPPwd")
        areadata.ASAPDataSource = request.POST.get("ASAPDataSource")
        areadata.save()
        print("-Area updated successfully")
    return HttpResponseRedirect("/repository/area")

def area_delete(request, id):
    areadata = Area.objects.get(idArea=id)
    areadata.Status = 0
    areadata.save()
    print("-Area has been deleted successfully")
    return HttpResponseRedirect("/repository/area")
#Area End /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

#Branch Start \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
def branch_view(request):
    all_branches = Branch.objects.filter(Status=1).order_by('-idBranch')
    return render(request, 'repository_templates/branch.html', {'all_branches' : all_branches})

def branch_add(request):
    return HttpResponseRedirect("/repository/branch")
#Branch End /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

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