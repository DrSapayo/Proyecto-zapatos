from django.shortcuts import render
from rest_framework import viewsets
from .models import Inventario, SistemaVentas
from .serializers import InventarioSerializers, SistemaVentasSerializers

# Create your views here.

class InventarioViewSet(viewsets.ModelViewSet):
    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializers

class SistemaVentasViewSet(viewsets.ModelViewSet):
    queryset = SistemaVentas.objects.all()
    serializer_class = SistemaVentasSerializers