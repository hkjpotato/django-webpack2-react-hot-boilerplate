from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
templatePrefix = 'app2/'

#https://stackoverflow.com/questions/5154358/django-what-is-the-difference-between-render-render-to-response-and-direc
def index(request):
    return render(request, templatePrefix + 'index.html', {'msg': 'Hi from app2 view'})
