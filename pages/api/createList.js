import connectDB from "./auth/lib/connectDB"
import Lists from '../models/listModel'

connectDB()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = req.body
        if (!body.user_id || !body.name) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }
        const list = await Lists.create({ user_id: body.user_id, name: body.name })
        res.status(201).json({ message: 'Task added successfully', task_id: JSON.parse(JSON.stringify(list._id)) })
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}