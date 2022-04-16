#! /bin/sh

echo "$GIT_CONTAINER_PASSWORD" | sudo -S chmod 777 /etc/ssh/sshd_config # enable editing the sshd_config
echo "$GIT_CONTAINER_PASSWORD" | sudo -S echo 'PasswordAuthentication no\nUsePam no\nPermitRootLogin no\nPermitRootLogin prohibit-password' >> /etc/ssh/sshd_config`, #disable password auth
