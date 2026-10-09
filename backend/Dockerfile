FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1



WORKDIR /app

RUN groupadd --system --gid 10001 appgroup \ 
&& useradd --system --uid 10001 --gid appgroup  --no-create-home appuser


COPY requirements.txt .
RUN pip install -r  requirements.txt  && pip uninstall -y pip setuptools


COPY . .


USER 10001

EXPOSE 8000

CMD ["gunicorn", "backend.asgi:application", \
     "-k", "uvicorn_worker.UvicornWorker", \
     "-b", "0.0.0.0:8000", \
     "-w", "2"]