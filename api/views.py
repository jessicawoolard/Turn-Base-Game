from django.shortcuts import render
from rest_framework import viewsets
from .serializer import GameSerializer
from fighters.models import Game


class GameViewSet(viewsets.ModelViewSet):

    model = Game
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

