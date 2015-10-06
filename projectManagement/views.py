from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate , login , logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.template import RequestContext

@login_required(login_url = '/login')
def project(request):
    return render(request , 'projectsHome.html', {})
