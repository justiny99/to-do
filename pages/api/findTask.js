import connectDB from "./auth/lib/connectDB"
import Tasks from '../models/taskModel'

connectDB()


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = req.body
        if (!body.user_id || !body.list) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }
        const tasks = await Tasks.find({ user_id: body.user_id, list: body.list })
        res.status(201).json({ message: 'Tasks found successfully', tasks: JSON.parse(JSON.stringify(tasks)) })
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}