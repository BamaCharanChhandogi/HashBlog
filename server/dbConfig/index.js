import mongoose from "mongoose"

export const dbConnection=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useCreateIndex:true,
            // useFindAndModify:false
        });
        console.log("Database connected successfully");
    }catch(err){
        console.log("Error in connecting to database",err);
    }
}