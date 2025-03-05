import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function deleteCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params

    const categoryExist = await Category.findById({ _id: categoryId })

    if(!categoryExist) {
      res.status(400).json({ error: 'paramter id not found' })
      return
    }
    await Category.deleteOne({ _id: categoryId })

    res.status(204).json({ message: 'Category deleted' })

  }catch (error){
    console.log(error)
    res.status(500)
  }
}
