from django.db import models

# Create your models here.
class CartItem(models.Model):
    productId = models.CharField(max_length=150)
    quantity = models.IntegerField()
    deliveryOptionId = models.CharField(max_length=1)

class Cart(models.Model):
    cartItem = models.ManyToManyField(CartItem)
