from django.shortcuts import render
from django.template.context_processors import request
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Memory
from .serializers import MemorySerializers
from django.contrib.auth.models import User
from django.contrib import auth
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required

# Create your views here.

@api_view(['POST'])
def login(request):
    data = request.data
    username = data.get("username")
    password = data.get("password")

    user = auth.authenticate(username=username, password=password)

    if user is not None:
        auth.login(request, user)

        token, created = Token.objects.get_or_create(user=request.user)

        return Response(
            {
                "success":"Login Successfully",
                "token":token.key
            },status=status.HTTP_201_CREATED
        )

    else:
        return Response({"error":"Babe! you forgot your credentials ?"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def send_image(request):
    data = request.data
    image = request.FILES.get('image')
    desc = data.get('description')

    try:

        if not request.user.is_authenticated:
            return Response(
                {"error": "Baby log in before you create a memory entry."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        image_entry = Memory.objects.create(user=request.user, image=image, description=desc)
        serializer = MemorySerializers(image_entry)

        return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error":f"Error creating Memory entry: {e}"})


@api_view(['GET'])
def home_page(request):
    Images = Memory.objects.all()
    serializer = MemorySerializers(Images, many=True)

    return Response({"data":serializer.data}, status=status.HTTP_200_OK)
