from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Session, UserProfile

class UserSerializer(serializers.ModelSerializer):
    gender = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'gender']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True, 'allow_blank': False}
        }

    def create(self, validated_data):
        gender = validated_data.pop('gender', None)
        password = validated_data.pop('password')
        
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(password)
        user.save()

        UserProfile.objects.create(
            user=user,
            gender=gender
        )

        return user

class SessionSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(read_only=True)
    registrations = serializers.SerializerMethodField()

    class Meta:
        model = Session
        fields = ['id', 'title', 'description', 'instructor', 'instructor_name', 'cost', 'date', 'time', 'duration', 'capacity', 'gender_preferences', 'registrations']
        extra_kwargs = {
            'id': {'read_only': True},
            'instructor': {'read_only': True},
            'instructor_name': {'read_only': True},
        }

    def get_registrations(self, obj):
        return [{'username': user.username, 'email': user.email} for user in obj.registrations.all()]
    
    def validate_gender_preferences(self, value):
        if value not in ['None', 'Male', 'Female']:
            raise serializers.ValidationError("Invalid gender preference")
        return value

class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ["user", "gender"]
