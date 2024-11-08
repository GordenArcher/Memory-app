
from rest_framework import serializers
from .models import Memory

class MemorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = ['id', 'user', 'image', 'description', 'date_created']