from django.conf.urls import url
from . import views

app_name = 'app1' #add name space for {% url %}

#wire the views into the urls
urlpatterns = [
    url(r'^$', views.index, name="index"),
]