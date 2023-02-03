import connectDB from "./auth/lib/connectDB"
import Users from '../models/userModel'
import DefaultLists from '../models/defaultListModel'
import bcrypt from 'bcrypt';

connectDB()

async function handler(req, res) {
    //Only POST method is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const body = req.body;
        //Validate
        if (!body.email || !body.email.includes('@') || !body.password) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }
        //Check existing
        const userExist = await Users.findOne({ email: body.email })
        if (userExist) {
            res.status(200).json({ message: 'Already registered'});
            return
        }
        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashpass = await bcrypt.hash(body.password, salt)
        const user = await Users.create({ email: body.email, password: hashpass})
        await DefaultLists.create({user_id: user._id})
        res.status(201).json({message: 'Registered successfully'})
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;