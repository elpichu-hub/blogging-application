# release: python manage.py migrate
# web: gunicorn backend.wsgi
# worker: python manage.py runworker
# redis: redis-server
# channels: daphne backend.asgi:application

web: gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT
redis: ./start_redis.sh