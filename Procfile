release: python manage.py migrate
web: gunicorn backend.wsgi --log-file -
worker: python manage.py runworker channels --settings=core.settings -v2