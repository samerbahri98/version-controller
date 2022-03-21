FROM ubuntu:20.04

RUN apt-get update && apt-get install -y software-properties-common  locales && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8

ARG DEBIAN_FRONTEND=noninteractive

ENV TZ=Europe/Budapest

RUN add-apt-repository ppa:deadsnakes/ppa

RUN apt-get update && apt-get install -y  tzdata sudo git openssh-server apache2 apache2-utils python3.8 python3-pip

RUN pip3 install grpcio grpcio-tools

RUN mkdir /var/git

RUN mkdir /var/server

RUN mkdir /var/actions

RUN chmod 777 /var/server

COPY ./run.sh /var/actions/run.sh

COPY ./manipulate_keys /var/actions/manipulate_keys

RUN addgroup git

RUN useradd -p $(openssl passwd -1 1234) -d /var/git -g git git

RUN useradd -p $(openssl passwd -1 1234) -d /home -g git node

RUN chown -R git /var/git

RUN chgrp -R git /var/git

RUN mkhomedir_helper git

RUN chown -R node /home

USER node

RUN mkdir /home/.ssh

RUN touch /home/.ssh/authorized_keys

USER root

RUN chown -R node /var/actions

RUN usermod -aG sudo node

RUN chmod -R 700 /var/actions

RUN echo "node ALL = NOPASSWD: /etc/init.d/apache2 restart, /var/actions/run.sh /var/actions/manipulate_keys" >>  /etc/sudoers 

RUN rm /etc/apache2/apache2.conf

COPY ./apache2.conf /etc/apache2/

RUN rm /etc/apache2/envvars

COPY ./envvars /etc/apache2/envvars

RUN a2enmod cgi alias env

RUN chgrp -R git /var/git

RUN echo "/usr/bin/git-shell" >> /etc/shells

RUN chsh git -s '/usr/bin/git-shell'

RUN service apache2 restart

RUN service ssh start

EXPOSE 22

EXPOSE 80

WORKDIR /var/git

CMD ["/usr/sbin/sshd","-D"]
