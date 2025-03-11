import { model, Schema, Types } from "mongoose";

export const Order = model(
  "Order",
  new Schema({
    table: {
      type: String,
      required: true,
    },
    employeeId: {
      type: Types.ObjectId,
      required: true
    },
    status: {
      type: String,
      enum: ['WAITING', 'IN_PRODUCTION', 'DONE', 'FINISH'],
      default: 'WAITING',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    products: {
      type: [{
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product'
        },
        quantity: {
          type: Number,
          default: 1
        }
      }],
      required: true,
    },
  })
);
