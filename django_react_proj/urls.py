
from django.contrib import admin
from django.urls import path, re_path
from students import views
from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/students/$', views.students_list),
    re_path(r'^api/students/(?P<pk>[0-9]+)$', views.students_detail),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
