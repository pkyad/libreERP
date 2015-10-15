from django.db import models
from django.contrib.auth.models import User, Group
# Create your models here.

class userDesignation(models.Model):

    UNIT_TYPE_CHOICE = (
        ('NOT' , 'Not selected..'),
        ('RND' , 'Research and Development'),
        ('OPE' , 'Operational'),
        ('MAN' , 'Management'),
    )

    RND_RANK_CHOICE = (
        ('Not Selected..' , 'Not Selected..'),
        ('Director' , 'Director'),
        ('Deputy Director' , 'Deputy Director'),
        ('Department Head' , 'Department Head'),
        ('Prof. InCharge' , 'Prof. InCharge'),
        ('Group Leader' , 'Group Leader'),
        ('Senior Scientist' , 'Senior Scientist'),
        ('Scientist' , 'Scientist'),
        ('Undergraduate Student' , 'Undergraduate Student'),
        ('Master Student' , 'Master Student'),
        ('PhD Candidate' , 'PhD Candidate'),
        ('Post Doctoral Candidate' , 'Post Doctoral Candidate'),
        ('Senior Engineer' , 'Senior Engineer'),
        ('Engineer' , 'Engineer'),
        ('Technician' , 'Technician'),
        ('General Staff' , 'General Staff'),
    )

    OPERATIONAL_RANK_CHOICE = (
        ('NOTS' , 'Not Selected..'),
        ('DIRE' , 'Director'),
        ('DEPD' , 'Deputy Director'),
        ('MANA' , 'Manager'),
        ('LEAD' , 'lead'),
        ('SENG' , 'Senior Engineer'),
        ('ENGI' , 'Engineer'),
        ('TECH' , 'Technician'),
        ('GENS' , 'General Staff'),
    )

    MANAGEMENT_RANK_CHOICE = (
        ('NOTS' , 'Not Selected..'),
        ('DIRE' , 'Director'),
        ('DEPD' , 'Deputy Director'),
        ('MANA' , 'Manager'),
        ('DMAN' , 'Deputy Manager'),
        ('EXEC' , 'Executive'),
        ('ASSO' , 'Associate'),
        ('GENS' , 'General Staff'),
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

    """ One more field can be user here
    """
    user = models.OneToOneField(User)
    domainType = models.CharField(choices = UNIT_TYPE_CHOICE , default = 'NOT' , max_length = 3)
    domain = models.CharField(max_length = 15 , choices = DOMAIN_CHOICES , default = 'NA')
    unit = models.CharField(max_length = 30 , null = True) # this should be unique for a given facilty
    department = models.CharField(max_length = 30 , null = True)
    rank = models.CharField(choices = RND_RANK_CHOICE , default = 'Not selected..' , max_length = 8)
    reportingTo = models.ForeignKey(User , related_name = "managing" , null=True)
    primaryApprover = models.ForeignKey(User, related_name = "approving" , null=True)
    secondaryApprover = models.ForeignKey(User , related_name = "alsoApproving" , null=True)

    def __unicode__(self):
        return self.rank

User.designation = property(lambda u : userDesignation.objects.get_or_create(user = u)[0])
