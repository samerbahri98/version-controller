import { IRepo } from "./IRepo";
import ITree from "./ITree";

export default interface ICommit {
    repo: IRepo;
    hash: string;
    hashAbbv: string;
    treeHash: string;
    treeHashAbbv: string;
    parentHash: string;
    parentHashAbbv: string;
    commitMessage?: string;
    tree: ITree,
    date: Date;
  }
  