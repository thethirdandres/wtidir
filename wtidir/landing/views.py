from django.shortcuts import render

# Create your views here.
def login_view(request):
    return render(request, 'landing_templates/login.html')

def landing_view(request):
    return render(request, 'landing_templates/landing.html')