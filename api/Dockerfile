FROM node:17-bullseye

RUN apt-get update && apt-get upgrade -y && apt-get install -y software-properties-common  locales && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8

ENV LANG en_US.utf8

ARG DEBIAN_FRONTEND=noninteractive

ENV TZ=Europe/Budapest

RUN apt-get update && apt-get install -y  tzdata sudo git openssh-server apache2 apache2-utils

RUN git config --system user.name version-controller

RUN git config --system user.email samer.bahri@edu.bme.hu

RUN addgroup git

RUN mkdir /var/git

RUN useradd -p $(openssl passwd -1 1234) -d /var/git -g git git

RUN mkdir /var/git/.ssh

RUN touch /var/git/.ssh/authorized_keys

RUN mkdir /var/git/.clones

RUN htpasswd -b -c /var/git/.htpasswd git 1234

RUN touch /var/git/.hushlogin

RUN chown -R git /var/git

RUN chgrp -R git /var/git

RUN chmod -R 660 /var/git

RUN mkhomedir_helper git

RUN usermod -aG git node

RUN echo "node ALL = NOPASSWD: ALL" >>  /etc/sudoers 

RUN chown -R node /var/git/.clones

RUN rm /etc/apache2/apache2.conf

COPY apache/apache2.conf /etc/apache2/

RUN rm /etc/apache2/envvars

COPY apache/envvars /etc/apache2/envvars

RUN a2enmod cgi alias env

RUN echo "/usr/bin/git-shell" >> /etc/shells
RUN chsh git -s '/usr/bin/git-shell'

EXPOSE 22

EXPOSE 80

WORKDIR '/var/www/app'

RUN npm cache clean –force

RUN npm install -g @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN nest build

EXPOSE 1337

CMD ["npm", "run","start:prod"]