import { Request, Response } from "express";
import { Product } from "../../models/Product";
import cloudinary from "../../config/cloudinaryConfig";

export async function createProducts(req: Request, res: Response) {
  try {
    const { name, price, category, description, ingredients } = req.body;

    if (!req.file) {
      res.status(400).json({ error: "Nenhuma imagem foi enviada." });
      return
    }

    // Envia a imagem para o Cloudinary
    const imageBase64 = req.file.buffer.toString("base64");
    const result = await cloudinary.v2.uploader.upload(`data:${req.file.mimetype};base64,${imageBase64}`, {
      folder: 'Waiterapp',
      resource_type: "auto",
    });

    // Extrai a URL da imagem do Cloudinary
    const imageUrl = result.secure_url;

    const products = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      imagePath: imageUrl,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });

    res.status(201).json(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
