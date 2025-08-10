from django.urls import path
from .views import SaveDateListCreateView

urlpatterns = [
    path("save-date/", SaveDateListCreateView.as_view(), name="save-date"),
]
