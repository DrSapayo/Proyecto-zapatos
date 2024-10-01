from rest_framework import serializers
from .models import Inventario, SistemaVentas

class InventarioSerializers(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'

class SistemaVentasSerializers(serializers.ModelSerializer):
    class Meta:
        model = SistemaVentas
        fields = '__all__'
    