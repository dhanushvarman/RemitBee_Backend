const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
let db;
let connection;

async function connectDB(req,res){
    try {
        connection = await mongoClient.connect(process.env.DB);
        db = connection.db('Schedule');
        return db
    } catch (error) {
        console.log(error);
        res.json({message:"Something wrong in connecting DB"})
    }
}

async function closeConnection(req,res){

    try {
        if(connection){
            return connection.close()
        }else{
            console.log("No connection")
        }
    } catch (error) {
        console.log(error)
        res.json({message:"Something wrong in connecting DB"})
    }
}

module.exports = { connectDB, closeConnection };