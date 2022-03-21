# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: publickey.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import user_pb2 as user__pb2


DESCRIPTOR = _descriptor.FileDescriptor(
  name='publickey.proto',
  package='git',
  syntax='proto3',
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_pb=b'\n\x0fpublickey.proto\x12\x03git\x1a\nuser.proto\"&\n\tPublickey\x12\x0b\n\x03key\x18\x01 \x01(\t\x12\x0c\n\x04user\x18\x02 \x01(\t2e\n\x0eManipulateKeys\x12\'\n\x06SetKey\x12\x0e.git.Publickey\x1a\r.git.Username\x12*\n\tRevokeKey\x12\x0e.git.Publickey\x1a\r.git.Usernameb\x06proto3'
  ,
  dependencies=[user__pb2.DESCRIPTOR,])




_PUBLICKEY = _descriptor.Descriptor(
  name='Publickey',
  full_name='git.Publickey',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='key', full_name='git.Publickey.key', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='user', full_name='git.Publickey.user', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=36,
  serialized_end=74,
)

DESCRIPTOR.message_types_by_name['Publickey'] = _PUBLICKEY
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Publickey = _reflection.GeneratedProtocolMessageType('Publickey', (_message.Message,), {
  'DESCRIPTOR' : _PUBLICKEY,
  '__module__' : 'publickey_pb2'
  # @@protoc_insertion_point(class_scope:git.Publickey)
  })
_sym_db.RegisterMessage(Publickey)



_MANIPULATEKEYS = _descriptor.ServiceDescriptor(
  name='ManipulateKeys',
  full_name='git.ManipulateKeys',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_start=76,
  serialized_end=177,
  methods=[
  _descriptor.MethodDescriptor(
    name='SetKey',
    full_name='git.ManipulateKeys.SetKey',
    index=0,
    containing_service=None,
    input_type=_PUBLICKEY,
    output_type=user__pb2._USERNAME,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='RevokeKey',
    full_name='git.ManipulateKeys.RevokeKey',
    index=1,
    containing_service=None,
    input_type=_PUBLICKEY,
    output_type=user__pb2._USERNAME,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
])
_sym_db.RegisterServiceDescriptor(_MANIPULATEKEYS)

DESCRIPTOR.services_by_name['ManipulateKeys'] = _MANIPULATEKEYS

# @@protoc_insertion_point(module_scope)
