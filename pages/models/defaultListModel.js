import mongoose from 'mongoose'

const defaultListSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, 'needs user_id']
    },
    today: {
        type: Array,
        default: [],
    },
    important: {
        type: Array,
        default: [],
    },
    projects: {
        type: Array,
        default: [],
    }

}, {timestamps: true})

let Dataset = mongoose.models.defaultLists || mongoose.model('defaultLists', defaultListSchema)
export default Dataset