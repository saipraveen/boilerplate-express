require('dotenv').config();
let express = require('express');
let app = express();
console.log("Hello World");
app.use((req, res, next) => {
  console.log(req.method+" "+req.path+" - "+req.ip);
  next();
});

app.get("/", (req, res) => { res.send("Hello Express")});

// app.get("/", (req, res) => { res.sendFile(__dirname + "/views/index.html")});
// app.use("/public", express.static(__dirname+"/public"));

app.get("/json", (req, res) => {
  const messageStyle = process.env.MESSAGE_STYLE;
  const helloMessage = "Hello json";
  const message = (messageStyle === "uppercase") ? helloMessage.toUpperCase() : helloMessage;
  res.json({"message" : message});
});




module.exports = app;
