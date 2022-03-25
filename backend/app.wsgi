import sys
sys.path.insert(0, '/var/www/gib2-prosjekt')

activate = '/var/www/gib2-prosjekt/backend/venv/bin/activate'
with open(activate) as file_:
    exec(file_.read(), dict(__file__=activate))    

from app import app as application