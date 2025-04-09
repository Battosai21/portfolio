from django.shortcuts import render, redirect
from django.contrib.auth import logout, login, authenticate
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib import messages
from .models import UserProfile
#from django.core.signing import BadSignature
#from .emailTokenGenerator import signer, send_verification_email

# Create your views here.
def home(request):
    return render(request, 'home.html')

def blog(request):
    return render(request, 'blog.html')

def historia(request):
    return render(request, 'historia.html')

def user_profile(request):
    if request.user.is_authenticated:
        user = request.user
        user_profile = UserProfile.objects.get(user=user)
        return render(request, 'user_profile.html', {'user': user, 'user_profile': user_profile})
    else:
        messages.error(request, "You need to be logged in to view your profile.")
        return redirect('login')

def login_page(request):
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
        if hasattr(user, 'userprofile'):
            if date_of_birth == '':
                user.userprofile.date_of_birth = '1900-01-01'
            else:
                user.userprofile.date_of_birth = date_of_birth
            user.userprofile.location = location
            user.userprofile.save()

        # Log the user in and redirect
        if request.user.is_authenticated:
            logout(request)
        login(request, user)
        # Send verification email (this is a placeholder, implement your own email sending logic)
        #send_verification_email(user)
        # Inform the user about the verification email
        messages.info(request, "Account created successfully! A verification email has been sent to your email address. It may take a few minutes to arrive. Please check your spam folder as well.")
        messages.info(request, "You need to verify your email address to complete the registration process. Have in mind that if the account is not verified within 24 hours, it will be deleted automatically.")
        return redirect('home')
    return render(request, 'registration/signup.html')

def logout_user(request):
    logout(request)

def validate_username(request):
    username = request.GET.get('username', None)
    if User.objects.filter(username=username).exists():
        return JsonResponse({'is_taken': True}, status=200)
    return JsonResponse({'is_taken': False}, status=200)

#def verify_email(request, token):
#    try:
#        username = signer.unsign(token)  # Verify the token
#        user = User.objects.get(username=username)
#        user.userprofile.is_verified = True
#        user.userprofile.save()
#        messages.success(request, "Your email has been verified successfully!")
#        return redirect('login')
#    except (BadSignature, User.DoesNotExist):
#        messages.error(request, "Invalid or expired verification link.")
#        return redirect('signup')