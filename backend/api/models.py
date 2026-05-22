from django.db import models
from django.contrib.auth.models import User, AbstractUser

class User(AbstractUser):
    bio = models.TextField(blank=True)
    deleted = models.BooleanField(default=False)

class Post(models.Model):
    # Relationship to the user who created the post
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="posts"
    )

    # Main post content
    content = models.TextField()

    # Optional image upload
    # image = models.ImageField(
    #     upload_to="posts/images/",
    #     blank=True,
    #     null=True
    # )

    # Users who liked the post
    likes = models.ManyToManyField(
        User,
        related_name="liked_posts",
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def total_likes(self):
        return self.likes.count()

    def __str__(self):
        return f"{self.user.username} - {self.content[:30]}"