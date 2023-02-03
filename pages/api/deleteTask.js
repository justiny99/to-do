import connectDB from "./auth/lib/connectDB"
import Tasks from '../models/taskModel'

connectDB()

export default async function handler(req, res) {
    // make async functions to check if 
    
    if (req.method === 'POST') {
        const body = req.body
        if (!body.task_id || !body.hasOwnProperty('index')) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }
        const task = await Tasks.findByIdAndRemove(body.task_id)
        res.status(201).json({ message: 'Task removed successfully', task: JSON.parse(JSON.stringify(task)) })
    } 
    else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}