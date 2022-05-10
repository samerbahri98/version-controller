import { Field, ObjectType } from "@nestjs/graphql";
import { sign } from "jsonwebtoken";
import { User } from "../user/entities/user.entity";
import { IAuth } from "./auth.interface";


@ObjectType()
export class Auth implements IAuth {
  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;

  @Field(() => User)
  user!: User;

  static createAccessToken: (user: User) => string = (user: User) =>
    sign({ userId: user.user_id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "1h",
    });

  static create = (user: User) => ({
    user,
    accessToken: "",
    refreshToken: "",
  });
  static createRefreshToken: (user: User) => string = (user: User) =>
    sign({ userId: user.user_id }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "7d",
    });
}
