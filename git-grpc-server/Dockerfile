FROM ubuntu:20.04

RUN apt-get update && apt-get install -y software-properties-common  locales && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8

ARG DEBIAN_FRONTEND=noninteractive

ENV TZ=Europe/Budapest

RUN add-apt-repository ppa:deadsnakes/ppa

RUN apt-get update && apt-get install -y  tzdata git python3.10 python3-pip

RUN mkdir /var/git
RUN addgroup git
RUN useradd -p $(openssl passwd -1 1234) -d /var/git -g git git
RUN chown -R git /var/git
RUN chgrp -R git /var/git
RUN mkhomedir_helper git
RUN echo "/usr/bin/git-shell" >> /etc/shells
RUN chsh git -s '/usr/bin/git-shell'

WORKDIR /usr/src/app

COPY reqirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

COPY ${PROTO_DIRECTORY} ./protp
COPY protoc.sh ./protoc.sh
RUN chmod +x protoc.sh
RUN ./protoc.sh

COPY . .

CMD [ "python3", "./src/api.py" ]
