import { Request, Response } from "express";
import { Order } from "../../models/Order";
import { Expo } from "expo-server-sdk";
import { TokenNotification } from "../../models/TokenNotification";

const expo = new Expo();

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if(!['WAITING', 'IN_PRODUCTION', 'DONE', 'FINISH'].includes(status)){
      res.status(400).json({
        error: 'Status should be one of these: WAITING, IN_PRODUCTION, DONE, FINISH'
      })
    }

    const orderChange = await Order.findByIdAndUpdate(orderId, { status });

    if (!orderChange) {
      res.status(404).json({ error: "Order not found" });
      return
    }

    if (status === "IN_PRODUCTION") {
      const userTokens = await TokenNotification.findOne({ userId: orderChange.employeeId });

      if (userTokens && userTokens.tokens.length > 0) {
        const messages = userTokens.tokens
          .filter((token) => Expo.isExpoPushToken(token))
          .map((token) => ({
            to: token,
            sound: "default",
            title: "Pedido em produção! 🫡",
            body: `🧑‍🍳 Pedido da mesa ${orderChange.table} entrou em produção!`,
          }));

        // Enviar notificação
        if (messages.length > 0) {
          await expo.sendPushNotificationsAsync(messages);
        }
      }
    }

    if (status === "DONE") {
      const userTokens = await TokenNotification.findOne({ userId: orderChange.employeeId });

      if (userTokens && userTokens.tokens.length > 0) {
        const messages = userTokens.tokens
          .filter((token) => Expo.isExpoPushToken(token))
          .map((token) => ({
            to: token,
            sound: "default",
            title: "Pedido Finalizado! 😊",
            body: `✅ Pedido da mesa ${orderChange.table} foi finalizado!`,
          }));

        // Enviar notificação
        if (messages.length > 0) {
          await expo.sendPushNotificationsAsync(messages);
        }
      }
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
}
