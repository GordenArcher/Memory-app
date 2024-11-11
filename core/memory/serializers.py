
from rest_framework import serializers
from .models import Memory
from django.contrib.auth.models import User

class MemorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = ['id', 'user', 'image', 'description', 'date_created']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']