import os

from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views.static import serve

from pskuproject.settings import REACT_TEMPLATE_PATH, LOGOUT_URL, DEBUG
from pskuproject.utils import get_user_session


def index(request):
    """Method to serve the default index.html React Page.

    Args:
        request: HttpRequest Object.
        page: The page user is trying to visit.

    Returns:
        Static index.html page content.
    """
    if request.method == 'GET':
        session = get_user_session(request, is_debug=DEBUG)
        if session:
            request.session.modified = True
            request.session["user"] = session
            return render(request, 'build/index.html', session)
        else:
            request.session.modified = False
            try:
                del request.session["user"]
            except KeyError:
                pass
            return HttpResponseRedirect(LOGOUT_URL)


def logout(request):
    """Method to perform logout operation.

    Args:
        request: HTTPRequest Object
    """
    if request.method == 'GET':
        session = get_user_session(request)
        if session:
            request.session.modified = False
            try:
                del request.session["user"]
            except KeyError:
                pass
        return HttpResponseRedirect(LOGOUT_URL)


def static_file_handler(request, folder, file):
    """Method to serve static files.
    The default static file middleware does not work in Azure Web App.

    Args:
        request: HttpRequest Object
        folder: Folder where the static file is stored (for e.g. media, js, css)
        file: Actual file name.

    Returns:
        The static file content.
    """
    if request.method == 'GET':
        static_file_path = os.path.join(REACT_TEMPLATE_PATH, "build", "static", folder, file)
        return serve(request, os.path.basename(static_file_path), os.path.dirname(static_file_path))
