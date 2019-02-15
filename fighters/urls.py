from django.urls import path

from . import views

app_name = 'fighters'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home')

    ]
