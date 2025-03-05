import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function createCategories(req: Request, res: Response) {
  try {
    const { name, icon } = req.body;

    const categories = await Category.create({
      name,
      icon,
    });

    res.json(categories);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
}
