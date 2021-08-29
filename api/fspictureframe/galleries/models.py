from PIL import Image
import os

from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch.dispatcher import receiver

# Create your models here.
MEDIA_BASE = "/media/galleries/"
MEDIA_BASE_PATH = f"{settings.MEDIA_ROOT}/galleries/"

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
    thumbnail_name = models.CharField(max_length=255, null=True, blank=True)
    gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE, related_name='pictures')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def path(self):
        return '{}{}'.format(self.gallery.base_url(), self.file_name)
    
    def thumbnail_path(self):
        if self.thumbnail_name is None:
            return None
        return f'{self.gallery.base_url()}{self.thumbnail_name}'


@receiver(post_save, sender=GalleryPicture)
def gallery_picture_saved(sender, instance, created, **kwargs):
    if created:
        file_name = instance.file_name
        image_path = f'{MEDIA_BASE_PATH}{instance.gallery.dir_name()}/{file_name}'
        thumb_dir = f'{MEDIA_BASE_PATH}{instance.gallery.dir_name()}/thumbnails'
        if not os.path.exists(thumb_dir):
            os.makedirs(thumb_dir)
        thumbnail_name = f'thumbnails/{file_name}'
        thumb_save_path =  f'{MEDIA_BASE_PATH}{instance.gallery.dir_name()}/{thumbnail_name}'
        image = Image.open(image_path)
        image.thumbnail((128,128))
        image.save(thumb_save_path)
        instance.thumbnail_name=thumbnail_name
        instance.save()
