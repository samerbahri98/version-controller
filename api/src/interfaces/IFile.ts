import { IRepo } from "./IRepo";

export interface IFile {
  name: string;
  type: string;
  content: string;
  directory: string;
  repo?: IRepo;
}
