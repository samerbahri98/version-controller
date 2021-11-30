import { IUser } from "./IUser";

export interface IPublicKey {
  public_key_id: string;
  public_key_hash: string;
  public_key_encryption_type: string;
  created_by: IUser;
  created_at?: Date;
}
