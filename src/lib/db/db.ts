import mongoose, { Connection } from "mongoose"

let isConnected: Connection | boolean = false

export const dbConnect = async () => {
    if (isConnected) {
        console.log("Database already connected....")
        return isConnected
    }
    try {
        const res = await mongoose.connect(process.env.MONGO_URL!)
        isConnected = res.connection
        console.log("Database connected successfully....")
        return isConnected
    } catch (error) {
        console.log(error)
    }
}