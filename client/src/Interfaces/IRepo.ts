import { IDownloadable } from "./IDownloadable";
import { IUser } from "./IUser";

export interface IRepo {
  repository_id: string;
  repository_name: string;
  download: IDownloadable;
  created_by: IUser;
  created_at: string;
}
