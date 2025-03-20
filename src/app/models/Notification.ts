import { model, Schema, Types } from "mongoose";

export const Notification = model(
  "Notification",
  new Schema(
    {
      employeeId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
      orderId: {
        type: Types.ObjectId,
        ref: "Order",
        required: true,
      },
      table: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["WAITING", "IN_PRODUCTION", "DONE", "FINISH"],
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      read: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
