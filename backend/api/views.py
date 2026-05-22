from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import generics, status
from .models import User
from .models import Post
from .serializers import UserSerializer
from .serializers import PostSerializer


# Create your views here.
def main(request):
    return HttpResponse("Welcome to the WeChirp API!")

class UserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

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
            # TODO: Handle if the post is already liked
            post.likes.add(user)

            return Response(
                {"message": "Post liked"},
                status=status.HTTP_200_OK
            )

        elif action == "unlike":
            # TODO: Handle if the post is already not liked
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