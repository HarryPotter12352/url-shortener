const express = require("express");
const mongoose = require("mongoose");
const { mongo_url, port } = require("./config.json")
const bodyParser = require("body-parser");


const urlSchema = new mongoose.Schema({
    url: {type: String, required: true},
    redirect: {type: String, required: true}
})


mongoose.connect(mongo_url);


const urlModel = mongoose.model("urlModel", urlSchema)
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
const urlEncodedParser = bodyParser.urlencoded({extended: false});


app.get("/", (req, res) => {
    res.send("Welcome to my URL shortener's homepage!");
});

app.get("/add", (req, res) => {
    res.render("add.ejs", {data: {content: ""}});
})

app.post("/submitted", urlEncodedParser, async (req, res) => {
    const query = await urlModel.findOne({url: req.body.shortener}, async (err, doc) => {
        if(doc === null){
            const new_url = await urlModel.create({url: req.body.shortener, redirect: req.body.redirect});
            res.send("Successfully added!");
        }
        else{
            res.render("add.ejs", {data: {content: `An endpoint with the name ${req.body.shortener} already exists!`}});
        }
    }) 
})


app.get("/shortener/:redirect", async (req, res) => {
    const query = await urlModel.findOne({url: req.params.redirect}, async (err, doc) => {
        if(doc === null){
            res.send("This endpoint does not exist! Make a new one on /add")
        }
        else{
            res.redirect(doc.redirect);
        }
    })
})



app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
})