import logging
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, serializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, SessionSerializer
from .models import Session

logger = logging.getLogger(__name__)

# Public session list (requires authentication)
class PublicSessionList(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

# User-specific session list and creation
class SessionListCreate(generics.ListCreateAPIView):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Session.objects.filter(instructor=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(instructor=self.request.user)
        else:
            print(serializer.errors)
        serializer.save(instructor=self.request.user)

# Delete session (only by instructor)
class SessionDelete(generics.DestroyAPIView):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Session.objects.filter(instructor=user)

# Create or list users (allows GET for listing & POST for registration)
class CreateUserView(generics.CreateAPIView):  
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        logger.info(f"Received data: {self.request.data}")  # Logs incoming request data

        email = serializer.validated_data.get("email")
        if not email or not email.endswith("@vitstudent.ac.in"):
            raise serializers.ValidationError({"email": "Invalid email. Must be a VIT student email."})  

        serializer.save()

