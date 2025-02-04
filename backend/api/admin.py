from django.contrib import admin
from .models import Session, UserProfile

@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ("title", "instructor", "date", "time", "capacity", "registered_count")
    search_fields = ("title", "instructor__username")
    list_filter = ("date", "instructor")

    def registered_count(self, obj):
        return obj.registrations.count()
    registered_count.short_description = "Registrations"

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "gender")
    search_fields = ("user__username", "user__email")
    list_filter = ("gender",)
