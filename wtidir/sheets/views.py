from django.shortcuts import render

# def main_view(request):
#     return render(request, 'sheets_templates/sheets.html')

def inventory_view(request):
    return render(request, 'sheets_templates/inventory.html')

def delivery_view(request):
    return render(request, 'sheets_templates/delivery.html')

def transfer_view(request):
    return render(request, 'sheets_templates/transfer.html')

def damage_view(request):
    return render(request, 'sheets_templates/damage.html')

def sold_view(request):
    return render(request, 'sheets_templates/sold.html')

def pettycash_view(request):
    return render(request, 'sheets_templates/pettycash.html')



def _delivery_view(request):
    return render(request, 'sheets_templates/_delivery_.html')