import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MongoDBConnectionURL:string = process.env.MongoDBURI as string;
const connectToMongoDB = async () : Promise<void> => {
    try {
        await mongoose.connect(MongoDBConnectionURL,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log("Connected to DB!");
    }
    catch(e)
    {
        console.log("Cannot connect to DB!");
        console.log(e)
        process.exit(1);
    }
}
export default connectToMongoDB;