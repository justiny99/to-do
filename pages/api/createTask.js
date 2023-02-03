import connectDB from "./auth/lib/connectDB"
import Tasks from '../models/taskModel'

connectDB()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = req.body
        if (!body.name || !body.list_id || !body.hasOwnProperty('index')) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }
        const task = await Tasks.create({ list_id: body.list_id, name: body.name, index: body.index })
        res.status(201).json({ message: 'Task added successfully', task: JSON.parse(JSON.stringify(task)) })
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}