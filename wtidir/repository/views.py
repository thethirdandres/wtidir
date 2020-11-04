from django.shortcuts import render
from django.contrib import messages
from django.http import HttpResponse, HttpResponseRedirect

from repository.forms import areaforms
from .models import Area
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
    return HttpResponseRedirect("/repository/area")

def area_update(request, id):
    if request.method == "POST":
        areadata=Area()
        areadata.AName = request.POST.get("_area")
        areadata.unBranchCommi = request.POST.get("unBranchCommi")
        print(request.POST.get("_area"), "Hello World", areadata.unBranchCommi)
    return HttpResponseRedirect("/repository/area")

def area_delete(request, id):
    areadata = Area.objects.get(idArea=id)
    areadata.Status = 0
    areadata.save()
    return HttpResponseRedirect("/repository/area")
#Area End /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

def branch_view(request):
    return render(request, 'repository_templates/branch.html')

def employee_view(request):
    return render(request, 'repository_templates/employee.html')



def uom_view(request):
    return render(request, 'repository_templates/uom.html')

def item_view(request):
    return render(request, 'repository_templates/item.html')