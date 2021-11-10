import { FieldResolver, Resolver, Root } from "type-graphql";
import { User } from "../../entities/User";

@Resolver(User)
export class UserResolver {
  @FieldResolver()
  async attribution_tag(@Root() parent: User) {
    return `${parent.username}<${parent.email}>`;
  }
}
