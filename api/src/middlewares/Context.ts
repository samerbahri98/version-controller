import { Request, Response } from "express";
import { IContext } from "../interfaces/IContext";
export const context: (req: Request, res: Response) => IContext = (
  req: Request,
  res: Response
) => {
  const ctext: IContext = { req, res };
  return ctext;
};
