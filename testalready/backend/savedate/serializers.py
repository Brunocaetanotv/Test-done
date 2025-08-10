from rest_framework import serializers
from .models import SaveDate


class EventTimeSerializer(serializers.Serializer):
    label = serializers.CharField(min_length=1)
    time = serializers.RegexField(
        regex=r'^([01]\d|2[0-3]):([0-5]\d)$',
        error_messages={"invalid": "Time must be in 24-hour format (HH:mm)."}
    )


class SaveDateWriteSerializer(serializers.ModelSerializer):
    """
    Serializer for writing SaveDate data (used in POST).
    """
    event_times = serializers.ListSerializer(
        child=EventTimeSerializer(),
        allow_empty=False
    )

    class Meta:
        model = SaveDate
        exclude = ["id", "created_at", "updated_at"]

   

class SaveDateReadSerializer(serializers.ModelSerializer):
    """
    Serializer for reading SaveDate data (used in GET).
    """
    class Meta:
        model = SaveDate
        fields = "__all__"
