const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { connectDB, closeConnection } = require("./config");
const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.get('/schedule', async (req, res) => {

    try {
        const db = await connectDB();
        const response = await db.collection('details').find({}).toArray();
        await closeConnection();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        await closeConnection();
        res.status(400).json({ message: "Something went wrong in fetching details" })
    }
});

app.post('/upload', async (req, res) => {

    try {
        const db = await connectDB();
        const response = await db.collection('details').insertOne({shifts:req.body});
        await closeConnection();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        await closeConnection();
        res.status(400).json({ message: "Something went wrong in uploading details" })
    }
});


app.listen(3000 || process.env.PORT, () => {
    console.log(`Server listening on 3000`)
})