# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: repo.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='repo.proto',
  package='git',
  syntax='proto3',
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_pb=b'\n\nrepo.proto\x12\x03git\"\"\n\x04Repo\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x0c\n\x04user\x18\x02 \x01(\t\"\xc2\x01\n\x06\x43ommit\x12\x17\n\x04repo\x18\x01 \x01(\x0b\x32\t.git.Repo\x12\x0c\n\x04hash\x18\x02 \x01(\t\x12\x11\n\thash_abbv\x18\x03 \x01(\t\x12\x11\n\ttree_hash\x18\x04 \x01(\t\x12\x16\n\x0etree_hash_abbv\x18\x05 \x01(\t\x12\x13\n\x0bparent_hash\x18\x06 \x01(\t\x12\x18\n\x10parent_hash_abbv\x18\x07 \x01(\t\x12\x16\n\x0e\x63ommit_message\x18\x08 \x01(\t\x12\x0c\n\x04\x64\x61te\x18\t \x01(\x03\"\'\n\x07\x43ommits\x12\x1c\n\x07\x63ommits\x18\x01 \x03(\x0b\x32\x0b.git.Commit24\n\x0eManipulateRepo\x12\"\n\nCreateRepo\x12\t.git.Repo\x1a\t.git.Repo2`\n\nGetCommits\x12\'\n\rGetHeadCommit\x12\t.git.Repo\x1a\x0b.git.Commit\x12)\n\x0e\x46indAllCommits\x12\t.git.Repo\x1a\x0c.git.Commitsb\x06proto3'
)




_REPO = _descriptor.Descriptor(
  name='Repo',
  full_name='git.Repo',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='name', full_name='git.Repo.name', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='user', full_name='git.Repo.user', index=1,
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
  serialized_start=19,
  serialized_end=53,
)


_COMMIT = _descriptor.Descriptor(
  name='Commit',
  full_name='git.Commit',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='repo', full_name='git.Commit.repo', index=0,
      number=1, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='hash', full_name='git.Commit.hash', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='hash_abbv', full_name='git.Commit.hash_abbv', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='tree_hash', full_name='git.Commit.tree_hash', index=3,
      number=4, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='tree_hash_abbv', full_name='git.Commit.tree_hash_abbv', index=4,
      number=5, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='parent_hash', full_name='git.Commit.parent_hash', index=5,
      number=6, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='parent_hash_abbv', full_name='git.Commit.parent_hash_abbv', index=6,
      number=7, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='commit_message', full_name='git.Commit.commit_message', index=7,
      number=8, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='date', full_name='git.Commit.date', index=8,
      number=9, type=3, cpp_type=2, label=1,
      has_default_value=False, default_value=0,
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
  serialized_start=56,
  serialized_end=250,
)


_COMMITS = _descriptor.Descriptor(
  name='Commits',
  full_name='git.Commits',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='commits', full_name='git.Commits.commits', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
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
  serialized_start=252,
  serialized_end=291,
)

_COMMIT.fields_by_name['repo'].message_type = _REPO
_COMMITS.fields_by_name['commits'].message_type = _COMMIT
DESCRIPTOR.message_types_by_name['Repo'] = _REPO
DESCRIPTOR.message_types_by_name['Commit'] = _COMMIT
DESCRIPTOR.message_types_by_name['Commits'] = _COMMITS
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Repo = _reflection.GeneratedProtocolMessageType('Repo', (_message.Message,), {
  'DESCRIPTOR' : _REPO,
  '__module__' : 'repo_pb2'
  # @@protoc_insertion_point(class_scope:git.Repo)
  })
_sym_db.RegisterMessage(Repo)

Commit = _reflection.GeneratedProtocolMessageType('Commit', (_message.Message,), {
  'DESCRIPTOR' : _COMMIT,
  '__module__' : 'repo_pb2'
  # @@protoc_insertion_point(class_scope:git.Commit)
  })
_sym_db.RegisterMessage(Commit)

Commits = _reflection.GeneratedProtocolMessageType('Commits', (_message.Message,), {
  'DESCRIPTOR' : _COMMITS,
  '__module__' : 'repo_pb2'
  # @@protoc_insertion_point(class_scope:git.Commits)
  })
_sym_db.RegisterMessage(Commits)



_MANIPULATEREPO = _descriptor.ServiceDescriptor(
  name='ManipulateRepo',
  full_name='git.ManipulateRepo',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_start=293,
  serialized_end=345,
  methods=[
  _descriptor.MethodDescriptor(
    name='CreateRepo',
    full_name='git.ManipulateRepo.CreateRepo',
    index=0,
    containing_service=None,
    input_type=_REPO,
    output_type=_REPO,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
])
_sym_db.RegisterServiceDescriptor(_MANIPULATEREPO)

DESCRIPTOR.services_by_name['ManipulateRepo'] = _MANIPULATEREPO


_GETCOMMITS = _descriptor.ServiceDescriptor(
  name='GetCommits',
  full_name='git.GetCommits',
  file=DESCRIPTOR,
  index=1,
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_start=347,
  serialized_end=443,
  methods=[
  _descriptor.MethodDescriptor(
    name='GetHeadCommit',
    full_name='git.GetCommits.GetHeadCommit',
    index=0,
    containing_service=None,
    input_type=_REPO,
    output_type=_COMMIT,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='FindAllCommits',
    full_name='git.GetCommits.FindAllCommits',
    index=1,
    containing_service=None,
    input_type=_REPO,
    output_type=_COMMITS,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
])
_sym_db.RegisterServiceDescriptor(_GETCOMMITS)

DESCRIPTOR.services_by_name['GetCommits'] = _GETCOMMITS

# @@protoc_insertion_point(module_scope)
