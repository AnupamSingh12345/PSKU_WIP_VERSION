from django.http import HttpResponseRedirect
from pskuproject.settings import LOGOUT_URL, DEBUG




def is_valid_session(function):
    # """Decorator to check if the user has valid session

    # Args:
    #     function: The function to be called next if user session is present.

    # Returns:
    #     Next function call or Logout operation

    # """
  
    def wrap(request, *args, **kwargs):
        if request.session.get("user") or DEBUG:
            return function(request, *args, **kwargs)
        else:
            return HttpResponseRedirect(LOGOUT_URL)

    wrap.__doc__ = function.__doc__
    wrap.__name__ = function.__name__
    return wrap
