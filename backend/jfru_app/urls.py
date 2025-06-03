from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('blessing/', blessing, name='blessing'),
    path('torah/<int:verse_id>', torah, name='torah'),
]