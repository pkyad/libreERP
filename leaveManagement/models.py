from django.db import models
from django.contrib.auth.models import User
from time import time

# Create your models here.
def getLeaveAttachmentPath(instance , filename ):
    return 'doc/leaveManagement/%s_%s_%s' % (str(time()).replace('.', '_'), instance.user.username, filename)
class leaveApplication(models.Model):
    """
    Model class for a leave Appliction, each application will have a user associated with it.
    One more thing one can do is to include a comment system to facilitates the manager's and applicant's
    response to any issue. As of now there is a approver's comment filed and probabily need a unique_for_date
    to deny submission of application for a same date
    """
    TYPE_CHOICES = (
        ('NOT' , 'Not selected..'),
        ('CAS' , 'Casual'),
        ('MED' , 'Medical'),
        ('PAR' , 'Parental'),
        ('MAT' , 'Maternity'),
        ('MAR' , 'Marriage'),
        ('WOR' , 'Work from home'),
        ('OUT' , 'Out station'),
        ('EDU' , 'Education'),
    )

    STATUS_CHOICES = (
        ('NA' , 'Not processed'),
        ('OK' , 'Approved'),
        ('RE' , 'Rejected'),
        ('AT' , 'Need attention'),
    )
    ACTION_CHOICES = (
        ('OK' , 'Approve'),
        ('RE' , 'Reject'),
        ('HO' , 'Hold decision'),
    )
    user  = models.ForeignKey( User , null=True)
    category = models.CharField(choices = TYPE_CHOICES , default = 'CAS' , max_length = 3)
    start = models.DateField(null = False)
    end = models.DateField(null = False)
    reason = models.TextField(max_length = 200 , null=True)
    attachment = models.FileField(upload_to = getLeaveAttachmentPath ,  null = True)

    status = models.CharField(choices = STATUS_CHOICES , default = 'NA' , max_length = 2)
    approver = models.CharField(max_length = 20 , null = True)
    approversComment = models.CharField(max_length = 200, null=True)
    approvedOn = models.DateField(null = True)

    adminStatus = models.CharField(choices = STATUS_CHOICES , default = 'NA' , max_length = 2)
    adminApprover = models.CharField(max_length = 20 , null = True)
    adminsComment = models.CharField(max_length = 200, null=True)
    adminApprovedOn = models.DateField(null = True)

class leaveCompensation(models.Model):
    MODE_CHOICE = (
        ('WFH' , 'Work from home'),
        ('WEE' , 'Weekend'),
        ('OVE' , 'Over time')
    )
    STATUS_CHOICES = (
        ('NA' , 'Not processed'),
        ('OK' , 'Approved'),
        ('RE' , 'Rejected'),
        ('AT' , 'Need attention'),
    )
    ACTION_CHOICES = (
        ('OK' , 'Approve'),
        ('RE' , 'Reject'),
        ('HO' , 'Hold decision'),
    )
    user  = models.ForeignKey( User , null=True)
    compensatingFor = models.DateField(null = True)
    compensatedOn = models.DateField(null = True)
    mode = models.CharField(choices = MODE_CHOICE , max_length = 3 , default = 'OVE')
    contribution = models.TextField(max_length = 1000 , null = False)

    status = models.CharField(choices = STATUS_CHOICES , default = 'NA' , max_length = 2)
    approver = models.CharField(max_length = 20 , null = True)
    approversComment = models.CharField(max_length = 200, null=True)
    approvedOn = models.DateField(null = True)

    adminStatus = models.CharField(choices = STATUS_CHOICES , default = 'NA' , max_length = 2)
    adminApprover = models.CharField(max_length = 20 , null = True)
    adminsComment = models.CharField(max_length = 200, null=True)
    adminApprovedOn = models.DateField(null = True)
