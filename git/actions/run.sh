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
        useradd -p $(openssl passwd -1 $password) -d /var/git/$username -g git $username
        mkhomedir_helper $username
        ;;
    *)
        echo "Invalid option"
        ;;
    esac
    ;;
repository)
    case $argument in
    create)
        git init --bare /var/git/$username/$repository.git
        ;;
    *)
        echo "Invalid option"
        ;;
    esac
    ;;
*)
    echo "Invalid option"
    ;;
esac


