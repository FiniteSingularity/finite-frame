from django.apps import AppConfig


class FramestateConfig(AppConfig):
    name = 'FrameState'

    def ready(self):
        print('test')
        try:
            import fspictureframe.framestate.signals  # noqa F401
        except ImportError:
            pass