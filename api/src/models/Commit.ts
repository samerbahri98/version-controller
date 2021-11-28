import { Field, ObjectType } from "type-graphql";
import { Repo } from "../entities/Repo";
import { ICommit } from "../interfaces/ICommit";

@ObjectType()
export class Commit implements ICommit {
  @Field()
  commit_hash!: string;
  @Field()
  commit_hash_abbreviated!: string;
  @Field()
  tree_hash!: string;
  @Field()
  tree_hash_abbreviated!: string;
  @Field()
  parent_hash?: string;
  @Field()
  parent_hash_abbreviated?: string;
  @Field()
  subject!: string;
  @Field()
  timestamp!: Date;
  @Field((of)=>Repo)
  repo!: Repo;

  constructor(line: string, repo: Repo) {
    this.repo = repo;
    const fields = line.split(" - ");
    this.commit_hash = fields[0];
    this.commit_hash_abbreviated = fields[1];
    this.tree_hash = fields[2];
    this.tree_hash_abbreviated = fields[3];
    this.parent_hash = fields[4];
    this.parent_hash_abbreviated = fields[5];
    this.subject != fields[6];
    this.timestamp = new Date(fields[7]);
  }
}
