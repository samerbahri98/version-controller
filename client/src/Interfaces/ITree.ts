import IBranch from "./IBranch";

export default interface ITree {
    branch: IBranch;
    path: string;
    files: string[];
    trees: string[];
  }
  