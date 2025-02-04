from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, SessionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Session
from rest_framework.response import Response
from rest_framework.views import APIView

class AvailableSessions(generics.ListCreateAPIView):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Session.objects.exclude(instructor=user).exclude(registrations=user)

class RegisteredSessions(generics.ListCreateAPIView):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Session.objects.filter(registrations=user)

class SessionCreate(generics.ListCreateAPIView):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Session.objects.filter(instructor=user)

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)

class SessionDelete(generics.DestroyAPIView):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Session.objects.filter(instructor=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class RegisterSession(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        session = get_object_or_404(Session, pk=pk)

        # Ensure the user is not the instructor of the session
        if request.user == session.instructor:
            return Response({"message": "Instructors cannot register for their own sessions."}, status=400)

        # Check if the user is already registered
        if session.registrations.filter(pk=request.user.pk).exists():
            return Response({"message": "You are already registered for this session."}, status=400)

        # Check if session capacity is full
        if session.registrations.count() >= session.capacity:
            return Response({"message": "Session is full."}, status=400)

        # Register the user
        session.registrations.add(request.user)

        return Response({"message": "Successfully registered for the session."}, status=201)
