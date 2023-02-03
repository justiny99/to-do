import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    list_id: {
        type: String,
        required: [true, 'needs list_id'],
    },
    name: {
        type: String,
    },
    index: {
        type: Number,
    },
    description: {
        type: String,
    },
    isToday: {
        type: Boolean,
    },
    isImportant: {
        type: Boolean,
    },
    isRecurrent: {
        type: Boolean,
    },

}, {timestamps: true})

let Dataset = mongoose.models.tasks || mongoose.model('tasks', taskSchema)
export default Dataset