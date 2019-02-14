FROM python:3.6-slim-stretch

RUN apt update
RUN apt install -y python3-dev gcc git

ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY backend backend/

RUN python backend/server.py

EXPOSE 5042

CMD ["python", "backend/app.py", "serve"]
