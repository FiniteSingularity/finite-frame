from fspictureframe.galleries.models import Gallery
from fspictureframe.framestate.models import FrameState


def create_frame_state(frame):
    fs = FrameState.objects.create(frame=frame)
    print('creating framestate')
    galleries = Gallery.objects.all()
    if galleries.count() > 0:
        fs.gallery = galleries.first()
        fs.save()
