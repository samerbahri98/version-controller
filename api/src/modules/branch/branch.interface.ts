import { Repo } from "../repo/entities/repo.entity";

export default interface IBranch{
    repo:Repo
    name:string
}