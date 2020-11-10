from django import forms
from repository.models import Area

class areaforms(forms.ModelForm):
    class Meta:
        model=Area
        fields="__all__"