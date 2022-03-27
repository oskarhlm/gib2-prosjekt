import sys
sys.path.insert(0, '/var/www/gib2-prosjekt/backend')

activate_this = '/home/geomatikkstud/.local/share/virtualenvs/backend-NqZzEFRB/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))    

from app import app as application
