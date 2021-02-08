from django.db import models
from datetime import datetime

class AccountGroup(models.Model):
    idAccountGroup = models.AutoField(primary_key=True, serialize=False)
    AGName = models.CharField(default='', max_length=50, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True)
    Status = models.BooleanField(default=True)

class AccountUser(models.Model):
    idAccountUser = models.AutoField(primary_key=True, serialize=False)
    idAccountGroup = models.IntegerField(default=0, null=True, blank=True)
    unAccountUser = models.IntegerField(default=0, null=True, blank=True)
    AUUserName = models.CharField(default='', max_length=50, null=True, blank=True)
    AULastName = models.CharField(default='', max_length=50, null=True, blank=True)
    AUFirstName = models.CharField(default='', max_length=50, null=True, blank=True)
    AUMiddleName = models.CharField(default='', max_length=50, null=True, blank=True)
    AUPassword = models.CharField(default='', max_length=100, null=True, blank=True)
    AUEmail = models.CharField(default='', max_length=50, null=True, blank=True)
    AGName = models.CharField(default='', max_length=50, null=True, blank=True)
    AUSession = models.CharField(default='', max_length=50, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True)
    Status = models.BooleanField(default=True)

class Branch(models.Model):
    idBranch = models.AutoField(primary_key=True, serialize=False)
    fkArea = models.IntegerField(default=0, null=True, blank=True)
    fkTemplateItemControl = models.IntegerField(default=0, null=True, blank=True)
    fkTemplateProductionBatch = models.IntegerField(default=0, null=True, blank=True)
    AName = models.CharField(default='', max_length=30, null=True, blank=True)
    TICName = models.CharField(default='', max_length=30, null=True, blank=True)
    TPBName = models.CharField(default='', max_length=45, null=True, blank=True)
    BName = models.CharField(default='', max_length=150, null=True, blank=True)
    BDescription = models.CharField(default='', max_length=150, null=True, blank=True)
    BSAPCode = models.CharField(default='', max_length=20, null=True, blank=True)
    BType = models.CharField(default='', max_length=20, null=True, blank=True)
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

class TemplateItemControl(models.Model):
    idTemplateItemControl = models.AutoField(primary_key=True, serialize=False)
    unTemplateItemControl = models.IntegerField(default=0, null=True, blank=True)
    unArea = models.IntegerField(default=0, null=True, blank=True)
    TICName = models.CharField(default='', max_length=30, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True)
    Status = models.BooleanField(default=True)

class AccountUserArea(models.Model):
    idAccountUserArea = models.AutoField(primary_key=True, serialize=False)
    idAccountUser = models.IntegerField(default=0, null=True, blank=True)
    idArea = models.IntegerField(default=0, null=True, blank=True)
    AName = models.CharField(default='', max_length=30, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True) 
    Status = models.BooleanField(default=True)

class EmployeeGroup(models.Model):
    idEmployeeGroup = models.AutoField(primary_key=True, serialize=False)
    EGName = models.CharField(default='', max_length=50, null=True, blank=True)
    EGLevel = models.IntegerField(default=0, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True) 
    Status = models.BooleanField(default=True)