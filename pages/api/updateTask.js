import connectDB from "./auth/lib/connectDB"
import Tasks from '../models/taskModel'

connectDB()

// should accept a list of tasks to update

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = req.body
        if (!body.filter || !body.update) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }
        const task = await Tasks.updateMany(body.filter, body.update)
        res.status(201).json({ message: 'Task(s) updated successfully', task: JSON.parse(JSON.stringify(task)) })
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}