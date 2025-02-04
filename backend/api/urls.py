from django.urls import path
from . import views

urlpatterns = [
    path('sessions/', views.AvailableSessions.as_view(), name='session-list'),
    path('sessions/register/<int:pk>/', views.RegisterSession.as_view(), name='session-register'),
    path('sessions/registered/', views.RegisteredSessions.as_view(), name='session-registered'),
    path('sessions/create/', views.SessionCreate.as_view(), name='session-create'),
    path('sessions/delete/<int:pk>/', views.SessionDelete.as_view(), name='session-delete')     
]
