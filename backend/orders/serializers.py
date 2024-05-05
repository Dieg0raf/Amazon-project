from .models import CartItem
from rest_framework import serializers
from rest_framework.response import Response

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = [
            'productId',
            'quantity',
            'deliveryOptionId'
        ]