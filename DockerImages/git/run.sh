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
        chgrp -R git /var/git/$username
        chown -R git /var/git/$username
        chmod 777 /var/git/$username
        
        echo  $username:$password >> /var/git/.htpasswd
        /etc/init.d/apache2 restart
        ;;
    setpublickey)
        ./manipulate_keys set $password
        ;;
    revokepublickey)
        ./manipulate_keys revoke $password
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
        chown -R git /var/git/$username/$repository.git
        chmod -R 777 /var/git/$username/$repository.git

        ;;
    list_commits)
        echo git log /var/git/$username/$repository.git --pretty=format:"%H - %h - %T - %t - %P - %p - %s - %cd"
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
