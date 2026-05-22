from django.urls import include, path
from .views import main, UserView, PostView, RegisterView
from django.contrib.auth.views import LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', main),
    path("register/", RegisterView.as_view()),
    path("token/", TokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("logout", LogoutView.as_view()),
    path('user', UserView.as_view()),
    path('post', PostView.as_view()),
]
