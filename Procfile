release: python manage.py migrate
web: gunicorn backend.wsgi
worker: python manage.py runworker
redis: redis-server
channels: daphne backend.asgi:application