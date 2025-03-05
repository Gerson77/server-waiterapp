import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function listproductsByCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params
    const category = await Product.find().where('category').equals(categoryId);

    res.json(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
