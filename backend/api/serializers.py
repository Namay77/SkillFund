from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Session

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class SessionSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(read_only=True)

    class Meta:
        model = Session
        fields = ['id', 'title', 'description', 'instructor', 'instructor_name', 'cost', 'date', 'time', 'duration', 'capacity', 'registrations']
        extra_kwargs = {
            'id': {'read_only': True},
            'instructor': {'read_only': True},
            'instructor_name': {'read_only': True}
        }
