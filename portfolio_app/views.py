from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib import messages
from .models import UserProfile

# Create your views here.
def home(request):
    return render(request, 'home.html')

def blog(request):
    return render(request, 'blog.html')

def historia(request):
    return render(request, 'historia.html')

def login(request):
    return render(request, 'registration/login.html')

def signup(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        date_of_birth = request.POST.get('date_of_birth')
        location = request.POST.get('location')

        # Create the user
        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=password,
            email=email
        )
        user.save()

        # Update the UserProfile instance
        user_profile = UserProfile.objects.create(
            user=user,
            date_of_birth=date_of_birth,
            location=location
        )
        user_profile.save()

        # Log the user in and redirect
        login(request, user)
        messages.success(request, 'Your account has been created successfully!')
        return redirect('home')
    return render(request, 'registration/signup.html')

def logout_user(request):
    logout(request)

def validate_username(request):
    username = request.GET.get('username', None)
    if User.objects.filter(username=username).exists():
        return JsonResponse({'is_taken': True}, status=200)
    return JsonResponse({'is_taken': False}, status=200)