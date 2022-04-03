import subprocess
from pprint import pprint

# from git.server.src.proto_output.repo_pb2 import Branch
repo_dir = "/home/samer/Projects/docker/version-controller/git/vol/samer123/repo123.git"

cmd = subprocess.Popen(["git","ls-tree","--full-tree","--name-only", "-r", "HEAD"],cwd=repo_dir, stdout=subprocess.PIPE)
result, err  = cmd.communicate()
lines = result.decode("ascii").split("\n")
del lines[-1]
files=[]

for line in lines:
    if "/" in line:
        files.append({
            "branch":"master",
            "name":line.split("/")[0],
            "type":"folder",
            "directory":"/"
        })
    else:
        files.append({
            "branch":"master",
            "name":line,
            "type":"file",
            "directory":"/"
        })
        
pprint(files)
print(line)