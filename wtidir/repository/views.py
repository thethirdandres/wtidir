from django.shortcuts import render

# Create your views here.
def main_view(request):
    return render(request, 'repository_templates/repository.html')

def area_view(request):
    return render(request, 'repository_templates/area.html')