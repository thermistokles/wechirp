from django.urls import include, path
from .views import main
from .views import UserView
from .views import PostView
from django.contrib.auth.views import LoginView, LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', main),
    path("token/", TokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("logout", LogoutView.as_view()),
    path('user', UserView.as_view()),
    path('post', PostView.as_view()),
]
