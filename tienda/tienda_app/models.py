import uuid
from django.db import models

# Create your models here.
class Inventario(models.Model):
    nombre_producto = models.CharField(max_length=100)
    stock = models.IntegerField()
    categoria = models.CharField(max_length=30)
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre_producto


class SistemaVentas(models.Model):
    inventario = models.ForeignKey(Inventario, related_name='ventas', on_delete=models.CASCADE)
    fecha_venta = models.DateField()
    stock_egreso = models.IntegerField()
    venta_total = models.DecimalField(max_digits=10, decimal_places=2, default=0, editable= False)
    codigo_venta = models.CharField(max_length=10, unique=True, editable=False, default=0)
    
    def save(self, *args, **kwargs):

        self.codigo_venta = self.generar_codigo()

        if self.inventario.stock < self.stock_egreso:
            raise ValueError("No hay suficiente stock para realizar la venta.")
        
        self.venta_total = self.stock_egreso * self.inventario.precio
    
        self.inventario.stock -= self.stock_egreso
        self.inventario.save()
    
        super().save(*args, **kwargs)
    
    def generar_codigo(self):
        return uuid.uuid4().hex[:10].upper()

    def delete(self, *args, **kwargs):
        # Restaura el stock al eliminar la venta
        self.inventario.stock += self.stock_egreso
        self.inventario.save()
        
        super().delete(*args, **kwargs)

        

    def __str__(self):
        return f"Venta de {self.stock_egreso} de {self.inventario.nombre_producto}"
