from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = 'fspictureframe.users'
    verbose_name = _("Users")

    def ready(self):
        print('test')
        try:
            import fspictureframe.users.signals  # noqa F401
        except ImportError:
            pass