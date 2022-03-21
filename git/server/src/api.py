import grpc
import os
from concurrent import futures
import logging

from User import User
from User import PublicKeys

from proto_output import user_pb2_grpc
from proto_output import publickey_pb2_grpc

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    user_pb2_grpc.add_CreateUserServicer_to_server (User(), server)
    publickey_pb2_grpc.add_ManipulateKeysServicer_to_server(PublicKeys(),server)
    # server.add_insecure_port(f"[::]:{os.environ['GRPC_PORT']}")
    server.add_insecure_port(f"[::]:50000")
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
