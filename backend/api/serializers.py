from rest_framework import serializers
from .models import User
from .models import Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'created_at', 'updated_at')

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'user', 'content', 'likes', 'created_at', 'updated_at')