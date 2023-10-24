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

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({"time": req.time})
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  // console.log("--", word, req.params);
  console.log("--", req.params);
  res.json({"echo": word});
});

app.route("/name").get((req, res) => {
  const { first, last } = req.query;
  res.json({"name": `${first} ${last}`});
}).post((req, res) => {
  // console.log("-- POST ", req);
});

module.exports = app;
