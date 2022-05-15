import { Repo } from '../repo/entities/repo.entity';
import ITree from '../tree/tree.interface';

export default interface ICommit {
  repo: Repo;
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
