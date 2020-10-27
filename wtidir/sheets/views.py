from django.shortcuts import render

# def main_view(request):
#     return render(request, 'sheets_templates/sheets.html')

def inventory_view(request):
    return render(request, 'sheets_templates/inventory.html')

def delivery_view(request):
    return render(request, 'sheets_templates/delivery.html')