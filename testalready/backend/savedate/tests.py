from django.test import TestCase

# Create your tests here.
import sys
import subprocess
try:
    import tzdata
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "tzdata"])

from django.test import TestCase
from savedate.models import SaveDate
from django.core.exceptions import ValidationError
from savedate.serializers import SaveDateWriteSerializer, SaveDateReadSerializer
from rest_framework.test import APIClient
from rest_framework import status

# ------------------ Model Tests ------------------

class SaveDateModelTest(TestCase):

    def setUp(self):
        # Valid data to create a SaveDate
        self.valid_data = {
            "title": "My Event",
            "event_subtitle": "Test Subtitle",
            "event_summary": "Test summary with more than ten characters",
            "event_times": {"Ceremony": "18:00", "Party": "20:00"},
            "event_venue": "Central Hall",
            "event_address": "Example Street, 123",
            "event_city": "São Paulo"
        }

    def test_create_savedate_success(self):
        """Creates a valid SaveDate and verifies it was saved."""
        savedate = SaveDate.objects.create(**self.valid_data)
        self.assertIsInstance(savedate, SaveDate)
        self.assertEqual(savedate.title, "My Event")
        self.assertEqual(str(savedate.title), "My Event")

    def test_title_min_length(self):
        """Title must have at least 3 characters."""
        self.valid_data["title"] = "Hi"  # invalid
        savedate = SaveDate(**self.valid_data)
        with self.assertRaises(ValidationError):
            savedate.full_clean()

    def test_event_summary_min_length(self):
        """Summary must have at least 10 characters."""
        self.valid_data["event_summary"] = "Short"
        savedate = SaveDate(**self.valid_data)
        with self.assertRaises(ValidationError):
            savedate.full_clean()

    def test_event_city_min_length(self):
        """City must have at least 2 characters."""
        self.valid_data["event_city"] = "A"
        savedate = SaveDate(**self.valid_data)
        with self.assertRaises(ValidationError):
            savedate.full_clean()

    def test_event_times_is_json(self):
        """event_times must accept JSON dictionary."""
        savedate = SaveDate.objects.create(**self.valid_data)
        self.assertIsInstance(savedate.event_times, dict)
        self.assertIn("Ceremony", savedate.event_times)


# ------------------ Serializer Tests ------------------

class SaveDateSerializerTest(TestCase):

    def setUp(self):
        self.valid_data = {
            "title": "My Event",
            "event_subtitle": "Test Subtitle",
            "event_summary": "Test summary with more than ten characters",
            "event_times": [
                {"label": "Ceremony", "time": "18:00"},
                {"label": "Party", "time": "20:00"}
            ],
            "event_venue": "Central Hall",
            "event_address": "Example Street, 123",
            "event_city": "São Paulo"
        }
        self.savedate_obj = SaveDate.objects.create(
            title="Another Event",
            event_subtitle="Sub title",
            event_summary="An event to test reading",
            event_times={"Ceremony": "18:00"},
            event_venue="Central Hall",
            event_address="Example Street, 123",
            event_city="São Paulo"
        )

    def test_write_serializer_valid(self):
        """Serializer must accept valid data."""
        serializer = SaveDateWriteSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_write_serializer_invalid_time(self):
        """Must fail if time is not in HH:mm format."""
        invalid_data = self.valid_data.copy()
        invalid_data["event_times"][0]["time"] = "25:61"
        serializer = SaveDateWriteSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("event_times", serializer.errors)

    def test_read_serializer_contains_expected_fields(self):
        """Read serializer must contain all model fields."""
        serializer = SaveDateReadSerializer(self.savedate_obj)
        data = serializer.data
        self.assertIn("id", data)
        self.assertIn("title", data)
        self.assertIn("event_times", data)


# ------------------ API Tests ------------------

class SaveDateAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.url = "/api/save-date/"  

        self.valid_payload = {
            "title": "My API Event",
            "event_subtitle": "Subtitle via API",
            "event_summary": "A valid summary for API testing",
            "event_times": [
                {"label": "Ceremony", "time": "18:00"},
                {"label": "Party", "time": "20:00"}
            ],
            "event_venue": "Central Hall",
            "event_address": "Example Street, 123",
            "event_city": "São Paulo"
        }

    def test_get_savedates_empty_list(self):
        """GET must return empty list initially."""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [])

    def test_create_savedate_success(self):
        """POST with valid payload must create and return 201."""
        response = self.client.post(self.url, self.valid_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["status"], "success")
        self.assertEqual(response.data["data"]["title"], self.valid_payload["title"])

    def test_create_savedate_invalid_time(self):
        """POST with invalid time must return 400 or 500 error."""
        payload = self.valid_payload.copy()
        payload["event_times"][0]["time"] = "25:99"
        response = self.client.post(self.url, payload, format="json")
        self.assertIn(response.status_code, [status.HTTP_400_BAD_REQUEST, status.HTTP_500_INTERNAL_SERVER_ERROR])
        self.assertEqual(response.data.get("status"), "error")
