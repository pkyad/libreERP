from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate , login , logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.template import RequestContext

from .forms import loginForm

profileSettingsSidebar = {
    'Profile settings': '?action=profileSettings',
    # 'Change Password' : '?action=changePassword' ,
    'Notification Settings' : '?action=notificationsSettings' ,
    'Themes' : '?action=changeTheme',
    }

def index(request):
    return render(request , 'index.html', {})
def Login(request):

    if request.user.is_authenticated():
        return redirect(reverse('HR:home'))
    else:
        print "Not logged in , Serving the login form"
    form = loginForm(request.POST or None)
    context = {
        "form":form,
    }
    if form.is_valid():
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username = username , password = password)
        if user is not None:
            login(request , user)
            # print "Success"
            if request.GET:
                return redirect(request.GET['next'])
            else:
                # print "Success but nowhere to redirect"
                return redirect(reverse('HR:home'))
        else:
            print "Wrong credentials"

    return render(request , 'login.html', context)

def Logout(request):
    logout(request)
    return render(request , 'index.html', {})

@login_required(login_url = '/login')
def home(request):
    return render(request , 'home.html', {})

@login_required(login_url = '/login')
def support(request):
    return render(request , 'support.html' , {})

@login_required(login_url = '/login')
def payroll(request):
    return render(request , 'payroll.html' , {})

@login_required(login_url = '/login')
def team(request):
    return render(request , 'teamManagement.html' , {})

@login_required(login_url = '/login')
def learn(request):
    return render(request , 'learningManagement.html' , {})

@login_required(login_url = '/login')
def business(request):
    return render(request , 'businessManagement.html' , {})

@login_required(login_url = '/login')
def document(request):
    return render(request , 'documentManagement.html' , {})

@login_required(login_url = '/login')
def project(request):
    return render(request , 'project.html' , {})

@login_required(login_url = '/login')
def recruit(request):
    return render(request , 'recruit.html' , {})

def indexHR(request):
    return render(request , 'index.html' , {})

def test(request):
    form = userLeaveApplicationForm()
    moduleTemplate = 'ngForm.html'
    context = {
        "form" : form,
    }
    return render(request, moduleTemplate , context)
