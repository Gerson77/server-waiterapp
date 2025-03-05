import { model, Schema } from "mongoose";

export const User = model('User', new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 5
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'GARÇOM'],
  },
}))
