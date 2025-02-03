from django.urls import path
from . import views

urlpatterns = [
    path('sessions/', views.SessionListCreate.as_view(), name='session-list'),
    path('sessions/delete/<int:pk>/', views.SessionDelete.as_view(), name='delete-session')     
]
