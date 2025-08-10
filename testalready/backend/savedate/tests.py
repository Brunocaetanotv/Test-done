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

# ------------------ Testes de Modelo ------------------

class SaveDateModelTest(TestCase):

    def setUp(self):
        # Dados válidos para criar um SaveDate
        self.valid_data = {
            "title": "Meu Evento",
            "event_subtitle": "Subtítulo Teste",
            "event_summary": "Resumo de teste com mais de dez caracteres",
            "event_times": {"Cerimônia": "18:00", "Festa": "20:00"},
            "event_venue": "Salão Central",
            "event_address": "Rua Exemplo, 123",
            "event_city": "São Paulo"
        }

    def test_create_savedate_success(self):
        """Cria um SaveDate válido e verifica se foi salvo."""
        savedate = SaveDate.objects.create(**self.valid_data)
        self.assertIsInstance(savedate, SaveDate)
        self.assertEqual(savedate.title, "Meu Evento")
        self.assertEqual(str(savedate.title), "Meu Evento")

    def test_title_min_length(self):
        """Título deve ter pelo menos 3 caracteres."""
        self.valid_data["title"] = "Oi"  # inválido
        savedate = SaveDate(**self.valid_data)
        with self.assertRaises(ValidationError):
            savedate.full_clean()

    def test_event_summary_min_length(self):
        """Resumo deve ter pelo menos 10 caracteres."""
        self.valid_data["event_summary"] = "Curto"
        savedate = SaveDate(**self.valid_data)
        with self.assertRaises(ValidationError):
            savedate.full_clean()

    def test_event_city_min_length(self):
        """Cidade deve ter pelo menos 2 caracteres."""
        self.valid_data["event_city"] = "A"
        savedate = SaveDate(**self.valid_data)
        with self.assertRaises(ValidationError):
            savedate.full_clean()

    def test_event_times_is_json(self):
        """event_times deve aceitar dicionário JSON."""
        savedate = SaveDate.objects.create(**self.valid_data)
        self.assertIsInstance(savedate.event_times, dict)
        self.assertIn("Cerimônia", savedate.event_times)


# ------------------ Testes de Serializers ------------------

class SaveDateSerializerTest(TestCase):

    def setUp(self):
        self.valid_data = {
            "title": "Meu Evento",
            "event_subtitle": "Subtítulo Teste",
            "event_summary": "Resumo de teste com mais de dez caracteres",
            "event_times": [
                {"label": "Cerimônia", "time": "18:00"},
                {"label": "Festa", "time": "20:00"}
            ],
            "event_venue": "Salão Central",
            "event_address": "Rua Exemplo, 123",
            "event_city": "São Paulo"
        }
        self.savedate_obj = SaveDate.objects.create(
            title="Outro Evento",
            event_subtitle="Sub título",
            event_summary="Um evento para testar leitura",
            event_times={"Cerimônia": "18:00"},
            event_venue="Salão Central",
            event_address="Rua Exemplo, 123",
            event_city="São Paulo"
        )

    def test_write_serializer_valid(self):
        """Serializer deve aceitar dados válidos."""
        serializer = SaveDateWriteSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_write_serializer_invalid_time(self):
        """Deve falhar se o horário não estiver no formato HH:mm."""
        invalid_data = self.valid_data.copy()
        invalid_data["event_times"][0]["time"] = "25:61"
        serializer = SaveDateWriteSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("event_times", serializer.errors)

    def test_read_serializer_contains_expected_fields(self):
        """Serializer de leitura deve conter todos os campos do modelo."""
        serializer = SaveDateReadSerializer(self.savedate_obj)
        data = serializer.data
        self.assertIn("id", data)
        self.assertIn("title", data)
        self.assertIn("event_times", data)


# ------------------ Testes de API ------------------

class SaveDateAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.url = "/api/save-date/"  

        self.valid_payload = {
            "title": "Meu Evento API",
            "event_subtitle": "Subtitulo via API",
            "event_summary": "Um resumo válido para teste de API",
            "event_times": [
                {"label": "Cerimônia", "time": "18:00"},
                {"label": "Festa", "time": "20:00"}
            ],
            "event_venue": "Salão Central",
            "event_address": "Rua Exemplo, 123",
            "event_city": "São Paulo"
        }

    def test_get_savedates_empty_list(self):
        """GET deve retornar lista vazia inicialmente."""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [])

    def test_create_savedate_success(self):
        """POST com payload válido deve criar e retornar 201."""
        response = self.client.post(self.url, self.valid_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["status"], "success")
        self.assertEqual(response.data["data"]["title"], self.valid_payload["title"])

    def test_create_savedate_invalid_time(self):
        """POST com horário inválido deve retornar erro 400 ou 500."""
        payload = self.valid_payload.copy()
        payload["event_times"][0]["time"] = "25:99"
        response = self.client.post(self.url, payload, format="json")
        self.assertIn(response.status_code, [status.HTTP_400_BAD_REQUEST, status.HTTP_500_INTERNAL_SERVER_ERROR])
        self.assertEqual(response.data.get("status"), "error")
