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

class SessionRegister(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        session = get_object_or_404(Session, pk=pk)

        if session.registrations.filter(pk=request.user.pk).exists():
            return Response({"message": "You have already registered for this session."}, status=400)
        elif session.registrations.count() >= session.capacity:
            return Response({"message": "Session is full."}, status=400)
        else:
            session.registrations.add(request.user)

        return Response({"message": "Successfully registered for the session."}, status=201)
