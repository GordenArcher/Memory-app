from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login),
    path("send_image/", views.send_image),
    path("home_page/", views.home_page)
]