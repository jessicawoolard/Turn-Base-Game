from rest_framework import serializers

from fighters.models import Game


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('pk', 'heroHealth', 'villainHealth')
        # depth = 1
