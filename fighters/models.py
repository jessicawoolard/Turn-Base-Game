from django.db import models


# Create your models here.
class Game(models.Model):
    heroHealth = models.IntegerField(default=100)
    villainHealth = models.IntegerField(default=100)

