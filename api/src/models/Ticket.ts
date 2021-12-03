import { Field, ObjectType } from "type-graphql";
import { User } from "../entities/User";
import { IDownloadable } from "../interfaces/IDownloadable";
import { ITicket } from "../interfaces/ITicket";

@ObjectType()
export class Ticket implements ITicket {
  constructor(user: User, Subject: string, Message: string) {
    this.Subject = Subject;
    this.Message = Message;
    this.Status = "Todo";
    this.ID = user.user_id;
    this.Email = user.email;
    this.Username = user.username;
  }

  @Field()
  Subject!: string;

  @Field()
  Message!: string;

  @Field()
  Email!: string;

  @Field()
  ID!: string;

  @Field()
  Status!: string;

  @Field()
  Username!: string;
}
