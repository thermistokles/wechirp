from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import generics, status
from .models import User, Post
from .serializers import RegisterSerializer, UserSerializer, PostSerializer

# Create your views here.
def main(request):
    return HttpResponse("Welcome to the WeChirp API!")

class UserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class PostView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    def perform_create(self, serializer):
        user = User.objects.get(id=4)
        serializer.save(user=user)

    def patch(self, request, *args, **kwargs):
        action = request.query_params.get('action')
        post_id = request.data.get("post_id")
        user_id = request.data.get("user_id")
        post = Post.objects.get(id=post_id)
        user = User.objects.get(id=user_id)
        
        if action == "like":
            if post.likes.filter(id=user.id).exists():
                return Response(
                    {"message": "Post already liked"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            post.likes.add(user)

            return Response(
                {"message": "Post liked"},
                status=status.HTTP_200_OK
            )

        elif action == "unlike":
            # TODO: Handle if the post is already not liked
            if not post.likes.filter(id=user.id).exists():
                return Response(
                    {"message": "Post never liked"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            post.likes.remove(user)

            return Response(
                {"message": "Post unliked"},
                status=status.HTTP_200_OK
            )

        return Response(
            {"error": "Invalid action"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
        return None