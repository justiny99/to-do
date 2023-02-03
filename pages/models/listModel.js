import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const listSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, 'needs user_id']
    },
    name: {
        type: String
    },
    isProject: {
        type: Boolean
    },

}, {timestamps: true})

let Dataset = mongoose.models.lists || mongoose.model('lists', listSchema)
export default Dataset