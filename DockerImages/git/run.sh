#! /bin/sh

while getopts p:c:a:u:r: flag; do
    case "${flag}" in
    u)
        username=${OPTARG}
        ;;
    r)
        repository=${OPTARG}
        ;;
    a)
        argument=${OPTARG}
        ;;
    c)
        command=${OPTARG}
        ;;
    p)
        password=${OPTARG}
        ;;
    *) echo "Invalid option: -$flag" ;;
    esac
done

case $command in
user)
    case $argument in
    create)
        mkdir /var/git/$username
        htpasswd -b /var/git/.htpasswd $username $password

        /etc/init.d/apache2 restart
        ;;
    setprivatekey)
        echo $password >> /var/git/.ssh/authorized_keys
        ;;
    revokeprivatekey)
        sed -i "$(grep -n $password /var/git/.ssh/authorized_keys  | head -n 1 | cut -d: -f1)d" /var/git/.ssh/authorized_keys
        ;;
    *)
        echo "Invalid argument"
        ;;
    esac
    ;;
repository)
    case $argument in
    create)
        git init --bare /var/git/$username/$repository.git
        chgrp -R git /var/git/$username/$repository.git
        chown -R $git /var/git/$username/$repository.git
        chmod -R 777 /var/git/$username/$repository.git

        ;;
    *)
        echo "Invalid argument"
        ;;
    esac
    ;;
*)
    echo "Invalid command"
    ;;
esac
