from django.db import models


#Model for storing project details
class Project(models.Model):
    title = models.CharField(max_length=200)            #Project title
    description = models.TextField()                    #Project description
    image = models.ImageField(upload_to='project_images/', blank=True, null=True)   #Thumbnail
    url = models.URLField(blank=True, null=True)        #Link to the project (Github, live demo)
    technologies_used = models.ManyToManyField('Skill', blank=True)     #Link to skills
    created_at = models.DateTimeField(auto_now_add=True)    #Auto timestamp

    def __str__(self):
        return self.title       #Display project title in admin panel
    
#Model for listing skills
class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('Programming Language', 'Programming Language'),
        ('Framework', 'Framework'),
        ('Database', 'Database'),
        ('Other', 'Other'),
    ]

    name = models.CharField(max_length=100)     #Skill name
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Other')   #Skill category
    proficiency = models.IntegerField(default=1)    #Skill level (1-10)

    def __str__(self):
        return self.name        #Display skill name in admin panel
    
#Model for handling contact form submissions
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)     #Sender's name
    email = models.EmailField()                 #Sender's email
    message = models.TextField()                #Message content
    submitted_at = models.DateTimeField(auto_now_add=True)  #Auto timestamp

    def __str__(self):
        return f"Message from {self.name}"      #Display sender's name in admin panel