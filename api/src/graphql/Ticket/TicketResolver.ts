import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
  ResolverInterface,
  UseMiddleware,
} from "type-graphql";
import { User } from "../../entities/User";
import { IContext } from "../../interfaces/IContext";
import { IsAuth } from "../../middlewares/IsAuth";
import { Ticket } from "../../models/Ticket";
import { AuthenticationError } from "apollo-server-errors";
import { airtableBase } from "../../config/airtable";

@Resolver((of) => Ticket)
export class TicketResolver {
  @Mutation(() => Ticket)
  @UseMiddleware(IsAuth)
  async create_ticket(
    @Arg("Subject") Subject: string,
    @Arg("Message") Message: string,
    @Ctx() { payload }: IContext
  ) {
    if (!payload) throw new AuthenticationError("not authenticated");

    return new Promise<Ticket>(async (resolve, reject) => {
      const user = await User.findOneOrFail(payload.userId);
      const ticket = new Ticket(user, Subject, Message);
      airtableBase("Tickets").create(
        [{ fields: { ...ticket } }],
        (err: any, records: any) => {
          if (err) reject(err);
          if (records) resolve(ticket);
        }
      );
    });
  }
}
