from django.db import models

# Create your models here.
MEDIA_BASE = "/media/galleries/"


class Gallery(models.Model):
    name = models.CharField(max_length=255)

    # From phoenix at Stack Overflow: 
    # https://stackoverflow.com/questions/3429878/automatic-creation-date-for-django-model-form-objects
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def dir_name(self):
        return self.name.replace(' ', '_').lower()

    def base_url(self):
        filename = self.dir_name()
        return '{}{}/'.format(MEDIA_BASE, filename)
    
    def __str__(self):
        return self.name


class GalleryPicture(models.Model):
    file_name = models.CharField(max_length=255)
    gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE, related_name='pictures')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def path(self):
        return '{}{}'.format(self.gallery.base_url(), self.file_name)

