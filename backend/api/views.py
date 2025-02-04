from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .serializers import UserSerializer, SessionSerializer
from .models import Session

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

        send_mail(
            subject="Session Registration Confirmation",
            message=f"Dear {request.user.username},\n\nYou have successfully registered for {session.title} on {session.date}.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[request.user.email],
            fail_silently=False,
        )

        return Response({"message": "Successfully registered for the session."}, status=201)
