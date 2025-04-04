from django.urls import path
from . import views  #Import views

urlpatterns = [
    path('', views.home, name='home'),
    path('blog/', views.blog, name='blog'),
    path('historia/', views.historia, name='historia'),
    path('projects/', views.projects, name='projects'),
    path('projects/<int:project_id>/', views.project_detail, name='project_detail'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout_user', views.logout_user, name='logout'),
    path('validate_username/', views.validate_username, name='validate_username'),
]