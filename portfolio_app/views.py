from django.shortcuts import render, get_object_or_404
from .models import Project     #Import the project model
from django.contrib.auth import logout
from django.http import JsonResponse
from django.contrib.auth.models import User

# Create your views here.
def home(request):
    projects = Project.objects.all()
    return render(request, 'home.html', {'projects': projects})

def blog(request):
    return render(request, 'blog.html')

def projects(request):
    projects = Project.objects.all()
    return render(request, 'projects.html', {'projects': projects})

def project_detail(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    return render(request, 'project_detail.html', {'project': project})

def historia(request):
    return render(request, 'historia.html')

def login(request):
    return render(request, 'registration/login.html')

def signup(request):
    return render(request, 'registration/signup.html')

def logout_user(request):
    logout(request)

def validate_username(request):
    username = request.GET.get('username', None)
    if User.objects.filter(username=username).exists():
        return JsonResponse({'is_taken': True}, status=200)
    return JsonResponse({'is_taken': False}, status=200)