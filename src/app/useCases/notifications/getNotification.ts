import { Request, Response } from "express";
import { Notification } from "../../models/Notification";
import { User } from "../../models/User";
import { startOfDay, endOfDay } from "date-fns";

export async function getNotification(req: Request, res: Response) {
  try {
    const { employeeId } = req.params
    const userExists = await User.findById(employeeId);

    if (!userExists) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date()); 

    const notifications = await Notification.find({
      employeeId: employeeId, 
      status: { $in: ["IN_PRODUCTION", "DONE", "FINISH"] }, 
      createdAt: { $gte: todayStart, $lte: todayEnd },
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
