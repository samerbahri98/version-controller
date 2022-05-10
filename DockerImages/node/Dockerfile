FROM node:17-bullseye

RUN groupadd docker
RUN usermod -aG docker node
RUN newgrp docker 

USER root

WORKDIR '/var/www/app'


