from django.shortcuts import render
from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = 'home.html'


class FightView(TemplateView):
    template_name = 'fightscreen.html'


class PickFighterView(TemplateView):
    template_name = 'pick_fighter.html'


class GameOverView(TemplateView):
    template_name = 'gameover.html'
