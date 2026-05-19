from django.urls import include, path
from .views import main
from .views import UserView
from .views import PostView

urlpatterns = [
    path('', main),
    path('user', UserView.as_view()),
    path('post', PostView.as_view()),
]
