FROM ubuntu:20.04

RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8

ENV LANG en_US.utf8

ARG DEBIAN_FRONTEND=noninteractive

ENV TZ=Europe/Budapest

RUN apt-get update && apt-get install -y tzdata sudo

RUN mkdir /var/git

RUN apt-get update && apt-get install -y git

RUN mkdir /var/actions

COPY ./run.sh /var/actions/run.sh

RUN addgroup git

RUN useradd -p $(openssl passwd -1 1234) -g git git

RUN mkhomedir_helper git

RUN chown git:git /var/git

RUN chown -R git:git /var/actions

RUN usermod -aG sudo git

RUN chmod -R 700 /var/actions

RUN echo "git ALL = NOPASSWD: /bin/systemctl restart httpd.service, /var/actions/run.sh" >>  /etc/sudoers 

RUN apt-get update && apt-get install -y openssh-server

RUN mkdir /var/git/home.git

RUN git init /var/git/home.git --bare

RUN git clone https://github.com/samerbahri98/dodecahedron.git /var/git/dodecahedron.git --bare

RUN apt-get update && apt-get install -y apache2

RUN apt-get update && apt-get install -y apache2-utils

RUN rm /etc/apache2/apache2.conf

COPY ./apache2.conf /etc/apache2/

RUN a2enmod cgi alias env

RUN chgrp -R www-data /var/git

RUN htpasswd -b -c /var/git/.htpasswd git git

RUN service apache2 restart

RUN service ssh start

EXPOSE 22

EXPOSE 80

WORKDIR /var/git

CMD ["/usr/sbin/sshd","-D"]
