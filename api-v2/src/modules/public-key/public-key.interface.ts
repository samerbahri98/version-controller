import { User } from "../user/entities/user.entity";

export interface IPublicKey {
    public_key_id: string;
    public_key_hash:string;
    public_key_encryption_type: string
    created_by: User;
	created_at: Date;
}
