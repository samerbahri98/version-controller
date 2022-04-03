import { User } from "../user/entities/user.entity";

export interface IAuth {
    accessToken: string;
    refreshToken: string;
    user: User;
}
