import mongoose from 'mongoose'

const connectDB = () =>{
    if (mongoose.connections[0].readyState) {
        console.log('Already connected')
        return
    }

    mongoose.connect(process.env.MONGODB_URI, {}, err => {
        if (err) throw err
        console.log('Connected successfully')
    })
}

export default connectDB