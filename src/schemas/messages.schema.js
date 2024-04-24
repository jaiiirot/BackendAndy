import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  user: String,
  messages: Array
})
export const Messages = mongoose.model('message', messageSchema)
