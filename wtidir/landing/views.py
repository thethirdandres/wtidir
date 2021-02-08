from django.shortcuts import render

# Create your views here.
def landing_view(request):
    return render(request, 'landing_templates/landing.html')

def temptemp_view(request):
    return render(request, 'sheets_templates/temptemp.html')