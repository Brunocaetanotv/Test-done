from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError
from .models import SaveDate
from .serializers import SaveDateWriteSerializer, SaveDateReadSerializer
import logging
from django.db import IntegrityError, DatabaseError

logger = logging.getLogger(__name__)


class SaveDateListCreateView(generics.ListCreateAPIView):
    """
    Handles listing and creating SaveDate invitations.

    - GET: Returns all SaveDate invitations
    - POST: Creates a new SaveDate invitation
    """
    permission_classes = [AllowAny]
    queryset = SaveDate.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return SaveDateWriteSerializer
        return SaveDateReadSerializer

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            save_date = serializer.save()

            read_serializer = SaveDateReadSerializer(save_date)
            return Response({
                "status": "success",
                "data": read_serializer.data,
                "message": "Save Date successfully created! Now you can start sharing it."
            }, status=status.HTTP_201_CREATED)

        except IntegrityError:
            return Response({
                "status": "error",
                "message": "A Save Date already exists or violates database constraints."
            }, status=status.HTTP_400_BAD_REQUEST)

        except DatabaseError:
            return Response({
                "status": "error",
                "message": "A database error occurred while creating the Save Date."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            logger.exception("Unexpected error during Save Date creation")
            return Response({
                "status": "error",
                "message": f"An unexpected error occurred: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
