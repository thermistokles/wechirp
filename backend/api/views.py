from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import User
from .serializers import UserSerializer

# Create your views here.
def main(request):
    return HttpResponse("Welcome to the WeChirp API!")

class UserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer