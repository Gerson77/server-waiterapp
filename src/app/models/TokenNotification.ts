import { model, Schema, Types } from "mongoose";

export const TokenNotification = model(
  "TokenNotification",
  new Schema({
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokens: {
      type: [String],
      required: true,
      default: [],
    },
  })
);
