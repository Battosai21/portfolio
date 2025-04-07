#File currently without use

from django.core.signing import Signer
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages

signer = Signer()

def send_verification_email(user):
    token = signer.sign(user.username)  # Generate a token
    verification_link = f"http://0.0.0.0:8000/verify-email/{token}/"
    send_mail(
        'Verify Your Email Address',
        f'Este es un mensaje automatizado, por favor no responda a este correo. Haga click en el link para verificar su email: {verification_link}',
        'escarra.manuel@gmail.com',
        [user.email],
        fail_silently=False,
    )