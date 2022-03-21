

import grpc
import os

import user_pb2 as user__pb2
import user_pb2_grpc

import publickey_pb2 as publickey__pb2
import publickey_pb2_grpc

authorizedKeysDir = "/var/git/.ssh/authorized_keys"


class User(user_pb2_grpc.CreateUser):
    def CreateUser(self, request, context):
        os.mkdir(f"/var/git/{request.name}")
        os.system(f"chgrp -R git /var/git/{request.name}")
        os.system(f"chown -R git /var/git/{request.name}")
        os.system(f"chmod 777 /var/git/{request.name}")
        os.system(
            f"htpasswd -b /var/git/.htpasswd {request.name} {request.password}")
        os.system(f"/etc/init.d/apache2 restart")
        return user__pb2.Username(name=request.name)


class PublicKeys(publickey_pb2_grpc.ManipulateKeys):

    def SetKey(self, request, context):
        key = f"no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty {request.key}\n"
        file = open(authorizedKeysDir, "a")
        file.write(key)
        file.close()
        return user__pb2.Username(name=request.user)

    def RevokeKey(self, request, context):
        key = f"no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty {request.key}"
        file = open(authorizedKeysDir, "r")
        lines = file.readlines()
        file.close()
        file = open(authorizedKeysDir, "w")
        for line in lines:
            if line.strip("\n") != key:
                file.write(line)
        file.close()
        return user__pb2.Username(name=request.user)

