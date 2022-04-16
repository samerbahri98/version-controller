import repo_pb2
import repo_pb2_grpc
import os
import subprocess
from google.protobuf.json_format import MessageToDict, ParseDict

master_dir = "/var/git"

# master_dir = "/home/samer/Projects/docker/version-controller/git/vol"
class Repo(repo_pb2_grpc.ManipulateRepo):
    def CreateRepo(self, request, context):
        repo_dir = f"{master_dir}/{request.user}/{request.name}.git"
        os.mkdir(repo_dir)
        os.system(f"chgrp -R git {repo_dir}")
        os.system(f"chown -R git {repo_dir}")
        os.system(f"chmod 777 {repo_dir}")
        return repo_pb2.Repo(name=request.name, user=request.user)

# class Branch(repo_pb2_grpc.ManipulateBranches):
#     def List


class File(repo_pb2_grpc.ManipulateFiles):
    def GetMasterHeadCommitFiles(self, request, context):
        repo_dir = f"{master_dir}/{request.user}/{request.name}.git"
        cmd = subprocess.Popen(["git", "ls-tree", "--full-tree", "--name-only",
                               "-r", "HEAD"], cwd=repo_dir, stdout=subprocess.PIPE)
        result, err = cmd.communicate()
        lines = result.decode("ascii").split("\n")
        del lines[-1]
        files = []

        for line in lines:
            if "/" in line:
                files.append({
                    "branch": {
                        "name":"master",
                        "repo":request
                        },
                    "name": line.split("/")[0],
                    "type": "folder",
                    "directory": "/"
                })
            else:
                files.append({
                    "branch": {
                        "name":"master",
                        "repo":request
                        },
                    "name": line,
                    "type": "file",
                    "directory": "/"
                })
        return repo_pb2.Files(files=files)

