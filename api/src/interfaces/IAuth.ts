import { User } from "../entities/User";

export interface IAuth {
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}
