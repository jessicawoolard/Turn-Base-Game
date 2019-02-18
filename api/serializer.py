from rest_framework.serializers import ModelSerializer

from fighters.models import Game


class GameSerializer(ModelSerializer):
    class Meta:
        model = Game
        fields = ('heroHealth', 'villainHealth')
        depth = 1
