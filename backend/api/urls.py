from django.urls import include, path
from .views import main
from .views import UserView

urlpatterns = [
    path('', main),
    path('users/', UserView.as_view()),
]
