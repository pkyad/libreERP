from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate , login , logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.template import RequestContext

from Employee.forms import myUserCreationForm, userProfileForm ,userProfileSettings

# Create your views here.
@login_required(login_url = '/login')
def admin(request):
    if request.method == 'GET':
        if 'action' in request.GET : # requesting a form
            actionType = request.GET['action']
            if actionType=="createUser":
                actionTemplate = 'genericForm.html'
                form = myUserCreationForm()
                context = {
                    "form" : form,
                    "navContext" : "employees",
                    "sidebar" : {'Search' : '?action=searchEmp'},
                }

            elif actionType =="profileSettings": # uses access
                actionTemplate = 'profileForm.html'
                user = request.user
                profile = user.profile
                form = userProfileSettings(instance = profile)
                context = {
                    "form" : form,
                    "actionContext" : "profileSettings",
                    "sidebar" :profileSettingsSidebar,
                }
            elif actionType =="editProfile": # admin access
                actionTemplate = 'genericForm.html'
                if 'username' in request.GET:
                    user = User.objects.get(username = request.GET['username'])
                else:
                    user = request.user
                print user
                profile = user.profile
                form = userProfileForm(instance = profile)
                context = {
                    "form" : form,
                    "dynamicHeading":{"main" : "Edit %s %s's profile" % (user.first_name ,user.last_name) , "small" : "username = %s" % user.username},
                    "navContext" : "employees",
                }
            elif actionType == "searchEmp":
                actionTemplate = 'searchEmp.html'
                context = {
                    "navContext" : "employees",
                }
            return render(request, actionTemplate , context)
        elif 'module' in request.GET:
            moduleType = request.GET['module']
            if moduleType =='leaveManagement':
                moduleTemplate = 'leaveManagement.html'
                context = {
                    # "dynamicHeading": { "main": "Leave management system", },
                    "navContext" : "employees",
                }
            return render(request, moduleTemplate , context)

    else:
        if 'action' in request.GET:
            actionType = request.GET['action']

            if actionType == 'createUser': # admin access
                actionTemplate = 'genericForm.html'
                form = myUserCreationForm(request.POST)
                actionSuccessMsg = "New user created"
                actionFailureMsg = "New user creation failed, Please fix the errors"
                context = {
                    "form" : form,
                    "navContext" : "employees",
                    "sidebar" : {'Search' : '?action=searchEmp'},
                }

            elif actionType == "profileSettings": # employees access
                actionTemplate = 'profileForm.html'
                user = request.user
                profile = user.profile
                form = userProfileSettings(request.POST , request.FILES,  instance = profile)
                context = {
                    "form" : form,
                    "sidebar" :profileSettingsSidebar,
                }
                actionSuccessMsg = "New settings saved"
                actionFailureMsg = "Errors occured"
            elif actionType == "editProfile": # Only admin access
                actionTemplate = 'genericForm.html'
                if 'username' in request.GET:
                    user = User.objects.get(username = request.GET['username'])
                else:
                    user = request.user
                profile = user.profile
                form = userProfileForm(request.POST , request.FILES,  instance = profile)
                context = {
                    "form" : form,
                    "dynamicHeading":{"main" : "Edit %s %s's profile" % (user.first_name ,user.last_name) , "small" : "username = %s" % user.username},
                    "navContext" : "employees",
                }
                actionSuccessMsg = "Profile details saved"
                actionFailureMsg = "Please fix the errors and try again"
            if form.is_valid():
                form.save()
                if actionSuccessMsg:
                    messages.success(request, actionSuccessMsg )
                return HttpResponseRedirect('/HR/admin/')
            else:
                if actionFailureMsg:
                    messages.error(request, actionFailureMsg )
                return render(request, actionTemplate , context)

        elif 'module' in request.GET: # it was a module request
            moduleType = request.GET['module']
            print "came in the post function of module , leaveManegement"
            if moduleType =='leaveManagement':
                moduleTemplate = 'leaveManagement.html'
                form = userLeaveApplicationForm()
                context = {
                    # "dynamicHeading": { "main": "Leave management system",},
                    "navContext" : "employees",
                    "form" : form,
                }

            return render(request, moduleTemplate , context)
    return render(request , 'admin.html', {})
