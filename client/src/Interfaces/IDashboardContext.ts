import { IRepo } from "./IRepo";

export interface IDashboardContext {
  layout: string;
  repositories: IRepo[];
}
