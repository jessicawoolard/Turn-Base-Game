from django.urls import path

from . import views

app_name = 'fighters'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('selection/', views.PickFighterView.as_view(), name='select'),
    path('fight/', views.FightView.as_view(), name='fight'),
    path('gameover/', views.GameOverView.as_view(), name='gameover'),
    ]
