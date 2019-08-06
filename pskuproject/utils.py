import hashlib
import time

import requests

from pskuproject.settings import BASE_URL


def get_user_session(request, is_debug=False):
    session = request.session.get("user")
    if session:
        session["servertime"] = int(time.time() * 1000)
        return session

    auth_url = 'https://' + BASE_URL + '/.auth/me'
    try:
        response = requests.get(url=auth_url, cookies=request.COOKIES, timeout=10).json()
        session = {}
        for i in response:
            for j in i:
                if j == "user_id":
                    session["email"] = i[j]
                elif j == "user_claims":
                    for k in i[j]:
                        if k["typ"] == "name":
                            session["username"] = k["val"]

        if "@pg.com" not in session.get("email", ""):
            return None

        # Get user permission
        # user_permissions = UserPermissions.objects.filter(username=session["email"])
        # if user_permissions:
        #     session["userpermissions"] = user_permissions[0].model_permissions

        # session["servertime"] = int(time.time() * 1000)
        # return session

    except Exception:
        if is_debug:
            return {
                "username": "Dummy",
                "email": "dummy@pg.com",
                "userpermissions": "SAUDI_CREST_TOOTHPASTE",
                "servertime": str(int(time.time() * 1000))
            }
        return None


def get_md5_hash(*args):
    hash_str = ""
    for arg in args:
        hash_str += arg
    return hashlib.md5(hash_str.encode()).hexdigest()
