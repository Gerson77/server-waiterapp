import { Request, Response } from "express";
import { Notification } from "../../models/Notification";

export async function updatedNotification(req: Request, res: Response) {
  try {
    const { notificationId } = req.params;

    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { $set: { read: true } },
      { new: true }
    );

    if (!updatedNotification) {
      res.status(404).json({ message: "Notification not found" });
      return;
    }

    res.status(200).json({
      message: "Notification marked as read successfully",
      notification: updatedNotification,
    });
    return;
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
}
