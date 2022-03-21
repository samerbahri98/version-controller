import grpc
import os
import subprocess
import datetime

import repo_pb2 as repo__pb2
import repo_pb2_grpc

class Repo(repo_pb2_grpc.ManipulateRepo):
    def CreateRepo(self,request,context):
        os.system(f"git init --bare /var/git/{request.user}/{request.name}.git")
        os.system(f"chgrp -R git /var/git/{request.user}/{request.name}.git")
        os.system(f"chown -R git /var/git/{request.user}/{request.name}.git")
        os.system(f"chmod -R 777 /var/git/{request.user}/{request.name}.git")
        return repo__pb2.Repo(name=request.name,user=request.user)

class Commit(repo_pb2_grpc.GetCommits):
    def FindAllCommits(self,request,context):
        output = os.popen(f'git --git-dir=/var/git/{request.user}/{request.name}.git/  log --pretty=format:"%H - %h - %T - %t - %P - %p - %s - %cd"').read()
        logs = output.splitlines()
        return repo__pb2.Commits([ for log in logs])
    def GetHeadCommit(self,request,context):
        output = os.popen(f'git --git-dir=/var/git/{request.user}/{request.name}.git/  log --pretty=format:"%H - %h - %T - %t - %P - %p - %s - %cd"').read()
        log = output.splitlines()[0].split(" - ")
        return repo__pb2.Commit(
            repo=request,
            hash=log[0],
            hash_abbv=log[1],
            tree_hash=log[2],
            tree_hash_abbv=log[3],
            parent_hash=log[4],
            parent_hash_abbv=log[5],   
            commit_message = log[6],
            date = int(datetime.datetime.strptime(log[7], '%a %b %d %H:%M:%S %Y %z').timestamp())
        )
        