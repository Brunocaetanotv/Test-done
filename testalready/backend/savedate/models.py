import uuid 
from django.db import models
from django.conf import settings  
from django.core.validators import MinLengthValidator, URLValidator


class SaveDate(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Unique identifier for this Save the Date invitation."
    )

    title = models.CharField(
        max_length=255,
        validators=[MinLengthValidator(3)],
        help_text="Main title of the event."
    )

    event_subtitle = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="Optional subtitle for the event."
    )

    event_summary = models.TextField(
        validators=[MinLengthValidator(10)],
        help_text="A short description or summary of the event."
    )


    event_times = models.JSONField(
        default=dict, blank=True,
        help_text="Array of event times, each with label and time in 24-hour format."
    )

    event_venue = models.CharField(
        max_length=255,
        validators=[MinLengthValidator(3)],
        help_text="Venue name, e.g., Grand Ballroom."
    )

    event_address = models.CharField(
        max_length=255,
        validators=[MinLengthValidator(3)],
        help_text="Street address of the venue."
    )

    event_city = models.CharField(
        max_length=100,
        validators=[MinLengthValidator(2)],
        help_text="City where the event takes place."
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

   
    def __str__(self):
        return f"{self.title} - {self.event_date}"
    
