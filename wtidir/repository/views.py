from django.shortcuts import render

# Create your views here.
def main_view(request):
    return render(request, 'repository_templates/repository.html')

def user_view(request):
    return render(request, 'repository_templates/user.html')

def area_view(request):
    return render(request, 'repository_templates/area.html')

def branch_view(request):
    return render(request, 'repository_templates/branch.html')

def employee_view(request):
    return render(request, 'repository_templates/employee.html')



def uom_view(request):
    return render(request, 'repository_templates/uom.html')