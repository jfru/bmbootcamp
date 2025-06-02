from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def blessing(request):
    """
    Render the index page.
    """
    return JsonResponse({'status': 'success'}, safe=False)