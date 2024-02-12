import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: String,
  message: String,
});

// Definir un modelo
export const Messages = mongoose.model("message", messageSchema);
