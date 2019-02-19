from .views import  GameViewSet
from django.urls import path

from . import views

urlpatterns = [
    path('game/', views.GameViewSet.as_view({
            'get': 'list',  # GET method should list objects
            'post': 'create',  # POST method should create object
        })),
    path('game/<int:pk>', views.GameViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy',
    })),
]
