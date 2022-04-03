import { Field, ObjectType } from "@nestjs/graphql";
import { IDownloadable } from "./downloadable.interface";

@ObjectType()
export class Downloadable implements IDownloadable {
  @Field()
  http!: string;
  @Field()
  ssh!: string;

  constructor(repository_name: string, username: string) {
    (this.http = `http://${process.env.URL}/git/${username}/${repository_name}.git/`),
      (this.ssh = `git@${process.env.URL}:${username}/${repository_name}.git`);
  }
}
