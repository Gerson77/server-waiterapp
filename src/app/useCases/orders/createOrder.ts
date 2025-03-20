import { Request, Response } from "express";
import { Order } from "../../models/Order";
import { io } from "../../..";
import { createNotification } from "../notifications/createNotification";

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products, employeeId } = req.body;

    const order = await Order.create({
      table,
      products,
      employeeId
    });
    const orderDetails = await order.populate('products.product')

    await createNotification(order._id , employeeId, table, 'WAITING')

    io.emit('order@new', orderDetails)
    res.status(201).json(order);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
}