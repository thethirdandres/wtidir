from django.db import models
from datetime import datetime

class Branch(models.Model):
    idBranch = models.AutoField(primary_key=True, serialize=False)
    unBranch = models.IntegerField(default=0, null=True, blank=True)
    unArea = models.IntegerField(default=0, null=True, blank=True)
    unTemplateItemControl = models.IntegerField(default=0, null=True, blank=True)
    unTemplateProductionBatch = models.IntegerField(default=0, null=True, blank=True)
    BName = models.CharField(default='', max_length=150, null=True, blank=True)
    BDescription = models.CharField(default='', max_length=150, null=True, blank=True)
    BSAPCode = models.CharField(default='', max_length=20, null=True, blank=True)
    BType = models.IntegerField(default=0, null=True, blank=True,)
    BQuotaInterval = models.DecimalField(default=0.0000, blank=True, null=True, max_digits=8, decimal_places=4)
    BQuota = models.DecimalField(default=0.0000, blank=True, null=True, max_digits=8, decimal_places=4)
    BQuotaPointAmount = models.DecimalField(default=0.0000, blank=True, null=True, max_digits=8, decimal_places=4)
    TimeStamp = models.DateTimeField(auto_now_add=True)
    Status = models.BooleanField(default=True)

class Area(models.Model):
    idArea = models.AutoField(primary_key=True, serialize=False)
    unArea = models.IntegerField(default=0, null=True, blank=True)
    unBranchCommi = models.CharField(default='', max_length=20, null=True, blank=True)
    AName = models.CharField(default='', max_length=30, null=True, blank=True)
    ASAPSvr = models.CharField(default='', max_length=20, null=True, blank=True)
    ASAPDB = models.CharField(default='', max_length=30, null=True, blank=True)
    ASAPUsr = models.CharField(default='', max_length=10, null=True, blank=True)
    ASAPPwd = models.CharField(default='', max_length=20, null=True, blank=True)
    ASAPDataSource = models.CharField(default='', max_length=30, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True)
    Status = models.BooleanField(default=True)

#Wala pa ma makemigrations nga mga class :

class TemplateItemControl(models.Model):
    idTemplateItemControl = models.AutoField(primary_key=True, serialize=False)
    unTemplateItemControl = models.IntegerField(default=0, null=True, blank=True)
    unArea = models.IntegerField(default=0, null=True, blank=True)
    TICName = models.CharField(default='', max_length=30, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True)
    Status = models.BooleanField(default=True)

