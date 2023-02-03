import DefaultLists from '../models/defaultListModel'
import connectDB from './auth/lib/connectDB'

connectDB()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = req.body
        const lists = await DefaultLists.create({user_id: body._id})
        res.status(201).json({ message: 'Task added successfully', task: JSON.parse(JSON.stringify(lists)) })
    } else {
        res.status(500).json({ message: 'Route not valid' });
    }
}

