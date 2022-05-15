import { AuthModule } from './auth/auth.module';
import { CommitModule } from './commit/commit.module';
import { DbModule } from './db/db.module';
import { GraphqlModule } from './graphql/graphql.module';
import { PublicKeyModule } from './public-key/public-key.module';
import { RepoModule } from './repo/repo.module';
import { UserModule } from './user/user.module';

export const modules = [
  DbModule,
  GraphqlModule,
  UserModule,
  AuthModule,
  RepoModule,
  PublicKeyModule,
  CommitModule,
];
