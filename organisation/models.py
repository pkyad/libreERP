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
        ('NOTSELEC' , 'Not Selected..'),
        ('DIRECTOR' , 'Director'),
        ('DEPDIREC' , 'Deputy Director'),
        ('DEPAHEAD' , 'Department Head'),
        ('PROFINCH' , 'Prof. InCharge'),
        ('GROUPLEA' , 'Group Leader'),
        ('SENSCIEN' , 'Senior Scientist'),
        ('SCIENTIS' , 'Scientist'),
        ('UNDERGRA' , 'Undergraduate Student'),
        ('MASTERST' , 'Master Student'),
        ('PHDSTUDE' , 'PhD Candidate'),
        ('POSTDOCS' , 'Post Doctoral Candidate'),
        ('SENIOREN' , 'Senior Engineer'),
        ('ENGNIEER' , 'Engineer'),
        ('TECHNICI' , 'Technician'),
        ('GETSTAFF' , 'General Staff'),
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
    rank = models.CharField(choices = RND_RANK_CHOICE , default = 'NOTSELEC' , max_length = 8)
    designation = models.CharField(null = False , max_length = 30)
    reportingTo = models.ForeignKey(User , related_name = "managing" , null=True)
    primaryApprover = models.ForeignKey(User, related_name = "approving" , null=True)
    secondaryApprover = models.ForeignKey(User , related_name = "alsoApproving" , null=True)

    def __unicode__(self):
        return self.designation

User.designation = property(lambda u : userDesignation.objects.get_or_create(user = u)[0])
