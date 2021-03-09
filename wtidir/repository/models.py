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

class Employee(models.Model):
    idEmployee = models.AutoField(primary_key=True, serialize=False)
    idEmployeeGroup = models.IntegerField(default=0, null=True, blank=True)
    unEmployee = models.CharField(default='', max_length=25, null=True, blank=True)
    ELastName = models.CharField(default='', max_length=50, null=True, blank=True)
    EFirstName = models.CharField(default='', max_length=50, null=True, blank=True)
    EMiddleName = models.CharField(default='', max_length=50, null=True, blank=True)
    EAlias = models.CharField(default='', max_length=50, null=True, blank=True)
    ENumber = models.CharField(default='', max_length=50, null=True, blank=True)
    EUsername = models.CharField(default='', max_length=50, null=True, blank=True)
    EPassword = models.CharField(default='', max_length=50, null=True, blank=True)
    EGroup = models.CharField(default='', max_length=25, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True) 
    Status = models.BooleanField(default=True)

class EmployeeGroup(models.Model):
    idEmployeeGroup = models.AutoField(primary_key=True, serialize=False)
    EGName = models.CharField(default='', max_length=50, null=True, blank=True)
    EGLevel = models.IntegerField(default=0, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True) 
    Status = models.BooleanField(default=True)

class EmployeeAccountArea(models.Model):
    idEmployeeAccountArea = models.AutoField(primary_key=True, serialize=False)
    idEmployee = models.IntegerField(default=0, null=True, blank=True)
    idArea = models.IntegerField(default=0, null=True, blank=True)
    AName = models.CharField(default='', max_length=30, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True) 
    Status = models.BooleanField(default=True)

class ProductUOM (models.Model):
    idProductUOM = models.AutoField(primary_key=True, serialize=False)
    PUOMName = models.CharField(default='', max_length=50, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True) 
    Status = models.BooleanField(default=True)

class ProductItem (models.Model):
    idProductItem = models.AutoField(primary_key=True, serialize=False)
    idProductUOM = models.IntegerField(default=0)
    idProductGroup = models.IntegerField(default=0)
    PIName = models.CharField(default='', max_length=255, null=True, blank=True)
    PISAPCode = models.CharField(default='', max_length=20, null=True, blank=True)
    PIPack = models.DecimalField(default=0.00, decimal_places=2, max_digits=8)
    PIBulkDiscount = models.IntegerField(default=0)
    PUOMName = models.CharField(default='', max_length=50, null=True, blank=True)
    PGName = models.CharField(default='', max_length=50, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True) 
    Status = models.BooleanField(default=True)

class DiscountType (models.Model):
    idDiscountType = models.AutoField(primary_key=True, serialize=False)
    DTName = models.CharField(default='', max_length=50, null=True, blank=True)
    DTPercent = models.DecimalField(default=0.00, decimal_places=2, max_digits=6)
    DTAmount = models.DecimalField(default=0.00, decimal_places=2, max_digits=6)
    DTVatExempt = models.BooleanField(default=False)
    TimeStamp = models.DateTimeField(auto_now_add=True) 
    Status = models.BooleanField(default=True)

class PaymentType (models.Model):
    idPaymentType = models.AutoField(primary_key=True, serialize=False)
    PTName = models.CharField(default='', max_length=50, null=True, blank=True)
    PTFixedAmount = models.DecimalField(default=0.00, decimal_places=2, max_digits=6)
    PTReference = models.IntegerField(default=0)
    PTPriority = models.IntegerField(default=0)
    TimeStamp = models.DateTimeField(auto_now_add=True) 
    Status = models.BooleanField(default=True)

class Device (models.Model):
    idDevice = models.AutoField(primary_key=True, serialize=False)
    idBranch = models.IntegerField(default=0)
    idArea = models.IntegerField(default=0)
    unDevice = models.CharField(default='', max_length=10, null=True, blank=True)
    BName = models.CharField(default='', max_length=50, null=True, blank=True)
    AName = models.CharField(default='', max_length=50, null=True, blank=True)
    DSerialNumber = models.CharField(default='', max_length=50, null=True, blank=True)
    DMacAddress = models.CharField(default='', max_length=50, null=True, blank=True)
    DName = models.CharField(default='', max_length=50, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True) 
    Status = models.BooleanField(default=True)

class ProductGroup(models.Model):
    idProductGroup = models.AutoField(primary_key=True, serialize=False)
    idProductType = models.IntegerField(default=0)
    idShortageType = models.IntegerField(default=0)
    PTName = models.CharField(default='', max_length=50, null=True, blank=True)
    STName = models.CharField(default='', max_length=50, null=True, blank=True)
    PGName = models.CharField(default='', max_length=50, null=True, blank=True)
    PGPriority = models.IntegerField(default=0)
    TimeStamp = models.DateTimeField(auto_now_add=True) 
    Status = models.BooleanField(default=True)

class ProductType(models.Model):
    idProductType = models.AutoField(primary_key=True, serialize=False)
    PTName = models.CharField(default='', max_length=50, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True) 
    Status = models.BooleanField(default=True)

class ShortageType(models.Model):
    idShortageType = models.AutoField(primary_key=True, serialize=False)
    STName = models.CharField(default='', max_length=50, null=True, blank=True)
    TimeStamp = models.DateTimeField(auto_now_add=True) 
    Status = models.BooleanField(default=True)