import { Request, Response } from "express";
import { Product } from "../../models/Product";
import cloudinary from "../../config/cloudinaryConfig";
import { extractPublicIdFromUrl } from "../../config/extractPublicIdFromUrl";

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params

    const productExist = await Product.findById({ _id: productId })

    if(!productExist) {
      res.status(400).json({ error: 'paramter id not found' })
      return
    }

    const imageUrl = productExist.imagePath;
    const publicId = extractPublicIdFromUrl(imageUrl);

    if (publicId) {
      await cloudinary.v2.api.delete_resources([publicId], { resource_type: "image" });
    }

    await Product.deleteOne({ _id: productId })

    res.status(204).json({ message: 'Product deleted' })

  }catch (error){
    console.log(error)
    res.status(500)
  }
}
