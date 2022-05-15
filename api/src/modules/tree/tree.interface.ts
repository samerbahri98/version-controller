import IBranch from '../branch/branch.interface';
import ICommit from '../commit/commit.interface';
import IFile from '../file/file.interface';

export default interface ITree {
  branch: IBranch;
  path: string;
  files: string[];
  trees: string[];
}
