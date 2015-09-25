from django.db import models
from django import forms
from django.contrib.auth.models import User
from time import time
# Create your models here.

def getSignaturesPath(instance , filename):
    return 'images/Sign/%s_%s_%s' % (str(time()).replace('.', '_'), instance.user.username, filename)
def getDisplayPicturePath(instance , filename):
    return 'images/DP/%s_%s_%s' % (str(time()).replace('.', '_'), instance.user.username, filename)
def getIDPhotoPath(instance , filename ):
    return 'images/ID/%s_%s_%s' % (str(time()).replace('.', '_'), instance.user.username, filename)
def getTNCandBondPath(instance , filename ):
    return 'doc/TNCBond/%s_%s_%s' % (str(time()).replace('.', '_'), instance.user.username, filename)
def getResumePath(instance , filename ):
    return 'doc/Resume/%s_%s_%s' % (str(time()).replace('.', '_'), instance.user.username, filename)
def getCertificatesPath(instance , filename ):
    return 'doc/Cert/%s_%s_%s' % (str(time()).replace('.', '_'), instance.user.username, filename)
def getTranscriptsPath(instance , filename ):
    return 'doc/Transcripts/%s_%s_%s' % (str(time()).replace('.', '_'), instance.user.username, filename)
def getOtherDocsPath(instance , filename ):
    return 'doc/Others/%s_%s_%s' % (str(time()).replace('.', '_'), instance.user.username, filename)

class userProfile(models.Model):
    user = models.OneToOneField(User)
    PREFIX_CHOICES = (
        ('NA' , 'NA'),
        ('Mr' , 'Mr'),
        ('Mrs' , 'Mrs'),
        ('Smt' , 'Smt'),
        ('Shri' ,'Shri'),
    )
    GENDER_CHOICES = (
        ('M' , 'Male'),
        ('F' , 'Female'),
        ('O' , 'Other'),
    )
    DOMAIN_CHOICES = (
        ('NA' , 'Not Assigned'),
        ('AUTO' , 'Automotive'),
        ('SERVICE' , 'Service'),
        ('RND' , 'University'),
        ('FMCG' , 'FMCG'),
        ('POWER' , 'Power'),
        ('PHARMA' , 'Pharmaceuticals'),
        ('MANUFAC' , 'Manufacturing'),
        ('TELE' , 'Tele Communications'),
    )
    empID = models.PositiveIntegerField(unique = True , null = True)
    displayPicture = models.ImageField(upload_to = getDisplayPicturePath)
    dateOfBirth = models.DateField( null= True )
    anivarsary = models.DateField( null= True )
    permanentAddressStreet = models.TextField(max_length = 100 , null= True , blank=True)
    permanentAddressCity = models.CharField(max_length = 15 , null= True , blank=True)
    permanentAddressPin = models.IntegerField(null= True ,  blank=True)
    permanentAddressState = models.CharField(max_length = 20 , null= True , blank=True)
    permanentAddressCountry = models.CharField(max_length = 20 , null= True , blank=True)

    localAddressStreet = models.TextField(max_length = 100 , null= True )
    localAddressCity = models.CharField(max_length = 15 , null= True )
    localAddressPin = models.IntegerField(null= True )
    localAddressState = models.CharField(max_length = 20 , null= True )
    localAddressCountry = models.CharField(max_length = 20 , null= True )

    prefix = models.CharField(choices = PREFIX_CHOICES , default = 'NA' , max_length = 4)
    gender = models.CharField(choices = GENDER_CHOICES , default = 'M' , max_length = 6)

    email = models.EmailField(max_length = 50)
    email2 = models.EmailField(max_length = 50, blank = True)

    mobile = models.PositiveIntegerField( null = True)
    emergency = models.PositiveIntegerField(null = True)
    tele = models.PositiveIntegerField(null = True , blank = True)
    website = models.URLField(max_length = 100 , null = True , blank = True)

    sign = models.ImageField(upload_to = getSignaturesPath ,  null = True)
    IDPhoto = models.ImageField(upload_to = getDisplayPicturePath ,  null = True)
    TNCandBond = models.FileField(upload_to = getTNCandBondPath ,  null = True)
    resume = models.FileField(upload_to = getResumePath ,  null = True)
    certificates = models.FileField(upload_to = getCertificatesPath ,  null = True)
    transcripts = models.FileField(upload_to = getTranscriptsPath ,  null = True)
    otherDocs = models.FileField(upload_to = getOtherDocsPath ,  null = True , blank = True)
    almaMater = models.CharField(max_length = 100 , null = True)

    domain = models.CharField(max_length = 15 , choices = DOMAIN_CHOICES , default = 'NA')
    unit = models.CharField(max_length = 30 , null = True)
    department = models.CharField(max_length = 30 , null = True)
    group = models.CharField(max_length = 30 , null = True)
    subGroup = models.CharField(max_length = 30 , null = True , blank = True)
    team = models.CharField(max_length = 30 , null = True)
    designation = models.CharField(max_length = 30 , null = True)

    fathersName = models.CharField(max_length = 100 , null = True)
    mothersName = models.CharField(max_length = 100 , null = True)
    wifesName = models.CharField(max_length = 100 , null = True , blank = True)
    childCSV = models.CharField(max_length = 100 , null = True , blank = True)

    note1 = models.TextField(max_length = 500 , null = True , blank = True)
    note2 = models.TextField(max_length = 500 , null = True , blank = True)
    note3 = models.TextField(max_length = 500 , null = True , blank = True)

User.profile = property(lambda u : userProfile.objects.get_or_create(user = u)[0])
