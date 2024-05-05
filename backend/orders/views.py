from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import serializers
from rest_framework.response import Response
from .serializers import OrderItemSerializer
from .models import Cart, CartItem

# Create your views here.
@api_view(['POST', 'GET'])
def orders(request):
    if request.method == "POST":
        cart = request.data.get('cart')
        serialized_cart = []

        for item in cart:
            serialized_item = OrderItemSerializer(data=item)
            if serialized_item.is_valid():
                serialized_item.save()
                serialized_cart.append(serialized_item.data) 
        return Response({'cart': serialized_cart})

    elif request.method == "GET":
        queryset = CartItem.objects.all()
        serializer = OrderItemSerializer(queryset, many=True)

        return Response(data=serializer.data)


        # instance = OrderItemsArraySerializer(data=cart ) 
        # print(instance)


