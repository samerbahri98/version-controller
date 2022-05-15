import IBranch from '../branch/branch.interface';
import ICommit from '../commit/commit.interface';

export default interface IFile {
  branch: IBranch;
  path: string;
  name: string;
  content: string;
}