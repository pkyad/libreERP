from django import forms
from .models import userProfile
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Layout, Field, Fieldset, MultiField,Button,HTML, Div, Hidden
from crispy_forms.bootstrap import PrependedText, PrependedAppendedText, FormActions, FieldWithButtons,TabHolder, Tab


class loginForm(forms.Form):
    username = forms.CharField(label = 'Username', required = True , widget = forms.TextInput(attrs={'placeholder':'Username'}))
    password = forms.CharField(label = 'Password', required = True , widget = forms.PasswordInput(attrs={'placeholder':'Password'}))
    helper = FormHelper()
    helper.form_method = 'POST'
    helper.form_class = 'form-horizontal'
    helper.label_class = 'col-sm-3'
    helper.field_class = 'col-sm-6'
    helper.layout = Layout(
        Fieldset('Login' ,'username' , 'password')
    )
    helper.add_input(Submit('login', 'login', css_class='btn-primary'))

class myUserCreationForm(UserCreationForm):

    class Meta:
        model = User
        fields = ('first_name', 'last_name' , 'username' , 'email' , 'password1' , 'password2')
    helper = FormHelper()
    helper.form_method = 'POST'
    helper.form_class = 'form-horizontal'
    helper.label_class = 'col-sm-3'
    helper.field_class = 'col-sm-6'
    helper.layout = Layout(
        Fieldset('Create a new User' , 'first_name' , 'last_name' , 'username' , 'email' , 'password1' , 'password2'),
        FormActions(
            Submit('Create', 'Create', css_class='btn-primary'),
            HTML("""
            <a class="btn btn-default" href="{% url 'HR:admin' %}">Cancel</a>
            """
            ),
        )
    )

class userProfileForm(forms.ModelForm):
    class Meta:
        model = userProfile
        fields = ('empID','dateOfBirth' , 'gender' ,  'prefix' , 'permanentAddressStreet' , 'permanentAddressCity',
            'permanentAddressState', 'permanentAddressPin' , 'permanentAddressCountry' , 'localAddressStreet' , 'localAddressCity' , 'localAddressPin',
            'localAddressState' , 'localAddressCountry' , 'email' , 'email2' ,'mobile', 'emergency' , 'tele' , 'website' , 'sign' , 'IDPhoto' ,
            'TNCandBond' , 'resume' , 'certificates' , 'transcripts' , 'otherDocs' , 'almaMater' ,
            'fathersName' , 'mothersName' , 'childCSV' ,'wifesName', 'note1' , 'note2' , 'note3')
    helper = FormHelper()
    helper.form_method = 'POST'
    helper.form_class = 'form-horizontal'
    helper.label_class = 'col-sm-3'
    helper.field_class = 'col-sm-6'
    helper.layout = Layout(
        TabHolder(
            Tab('Identification' , 'empID','prefix','gender','dateOfBirth','email','email2','mobile', 'emergency', 'tele', 'website' , 'sign' , 'IDPhoto'),
            Tab('Family' , 'fathersName' , 'mothersName', 'childCSV' , 'wifesName'),
            Tab('Address' , 'localAddressStreet', 'localAddressCity', 'localAddressPin', 'localAddressState','localAddressCountry','permanentAddressStreet','permanentAddressCity','permanentAddressState','permanentAddressPin' , 'permanentAddressCountry'),
            Tab('Documents', 'almaMater' ,'pgUniversity', 'docUniversity' 'TNCandBond' , 'resume' , 'certificates' , 'transcripts' , 'otherDocs'),
            Tab('Notes' , 'note1' , 'note2' , 'note3')
        ),
        FormActions(
            Submit('Save', 'Save', css_class='btn-primary'),
            HTML("""
            <a class="btn btn-default" href="{% url 'HR:admin' %}">Cancel</a>
            """
            ),
        )
    )

class userProfileSettings(forms.ModelForm):
    class Meta:
        model = userProfile
        fields = ('displayPicture','aboutMe', 'status' , 'coverPic')
    helper = FormHelper()
    helper.form_method = 'POST'
    helper.form_class = 'form-horizontal'
    helper.label_class = 'col-sm-3'
    helper.field_class = 'col-sm-6'
    helper.layout = Layout(
        Fieldset('Edit profile settings' , 'displayPicture' , 'aboutMe', 'status' , 'coverPic'),
        FormActions(
            Submit('Save', 'Save', css_class='btn-primary'),
            HTML("""
            <a class="btn btn-default" href="{% url 'HR:admin' %}">Cancel</a>
            """
            ),
        ),
    )
