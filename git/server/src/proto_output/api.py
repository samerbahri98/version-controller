import grpc
import os
from concurrent import futures
import logging

import asyncio
from User import User
from User import PublicKeys
from Repo import Repo
from Repo import Commit

import user_pb2_grpc
import publickey_pb2_grpc
import repo_pb2_grpc


async def serve():
    server = grpc.aio.server(futures.ThreadPoolExecutor(max_workers=10))
    user_pb2_grpc.add_CreateUserServicer_to_server(User(), server)
    publickey_pb2_grpc.add_ManipulateKeysServicer_to_server(
        PublicKeys(), server)
    repo_pb2_grpc.add_ManipulateRepoServicer_to_server(Repo(), server)
    repo_pb2_grpc.add_GetCommitsServicer_to_server(Commit(),server)

    server.add_insecure_port(f"[::]:{os.environ['GRPC_PORT']}")
    # server.add_insecure_port(f"[::]:50000")
    await server.start()
    await server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    asyncio.run(serve())
