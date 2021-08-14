import os
from .models import Gallery, GalleryPicture, MEDIA_BASE

def scan_for_galleries():
    directories = [
        name for name in os.listdir(path='./{}'.format(MEDIA_BASE)) if os.path.isdir(os.path.join('./media/galleries', name))
    ]
    gallery_names = [ g.dir_name() for g in Gallery.objects.all() ]
    new_directories = [ d for d in directories if d not in gallery_names ]
    old_directories = [ d for d in directories if d in gallery_names ]
    to_delete = [d for d in gallery_names if d not in directories]

    for d in new_directories:
        g = Gallery.objects.create(name=d.replace('_', ' ').title())
        images = [
            name for name in os.listdir(path='./{}{}'.format(MEDIA_BASE, d))
        ]
        for image in images:
            if image != 'thumbnails':
                GalleryPicture.objects.create(file_name=image, gallery=g)
    
    for d in old_directories:
        images = [
            name for name in os.listdir(path='./{}{}'.format(MEDIA_BASE, d))
        ]
        
        g = Gallery.objects.get(name=d.replace('_', ' ').title())
        existing = [
            img.file_name for img in g.pictures.all()
        ]
        for img in images:
            if img not in existing and img != 'thumbnails':
                GalleryPicture.objects.create(file_name=img, gallery=g)

    for d in to_delete:
        g = Gallery.objects.get(name=d.replace('_', ' ').title())
        g.delete()
