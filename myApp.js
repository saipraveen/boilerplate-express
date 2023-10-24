require('dotenv').config();
let express = require('express');
let app = express();
console.log("Hello World");

// app.get("/", (req, res) => { res.send("Hello Express")});

// app.get("/", (req, res) => { res.sendFile(__dirname + "/views/index.html")});
// app.use("/public", express.static(__dirname+"/public"));

// let helloMessage = "Hello json";
// console.log(process.env.MESSAGE_STYLE);
// // helloMessage += "-" + process.env.MESSAGE_STYLE;
// const getHelloMessage = () => (process.env.MESSAGE_STYLE === "uppercase") ? helloMessage.toUpperCase() : helloMessage;
// const jsonResponse = { "message": getHelloMessage() };
// app.get("/json", (req, res) => { res.json(jsonResponse) });

app.get("/json", (req, res) => {
  const messageStyle = process.env.MESSAGE_STYLE;
  const message = (messageStyle === "uppercase") ? "HELLO JSON" : "Hello json";
  res.json({"message" : message});
});




module.exports = app;
