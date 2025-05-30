import { Order } from "../../models/Order";
import { Notification } from "../../models/Notification";
import { Types } from "mongoose";
import { io } from "../../..";

export async function createNotification(orderId: Types.ObjectId, employeeId: string, table: string, status: string) {
  try {
    const orderExists = await Order.findById(orderId);

    if (!orderExists) {
      throw new Error("Order does not exist");
    }

    const notification = await Notification.create({
      employeeId,
      orderId,
      table,
      status,
    });

    io.emit('notification@new', notification)
    return notification
  } catch (error) {
    console.log(error);
  }
}
