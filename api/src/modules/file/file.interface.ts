import IBranch from '../branch/branch.interface';
import ICommit from '../commit/commit.interface';

export default interface IFileBlob {
  branch: IBranch;
  path: string;
  name: string;
  content: string;
}