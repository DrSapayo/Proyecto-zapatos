from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import InventarioViewSet, SistemaVentasViewSet

router = DefaultRouter()
router.register(r'Inventario', InventarioViewSet)
router.register(r'SistemaVentas', SistemaVentasViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]