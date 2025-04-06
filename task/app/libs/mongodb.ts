import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
    } catch (error) {
        console.error('MongoDB connection error:', error)
    }
}

export default connectMongoDB