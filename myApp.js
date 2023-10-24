require('dotenv').config();
const bodyParser = require("body-parser");
let express = require('express');
let app = express();
console.log("Hello World");
app.use((req, res, next) => {
  console.log(req.method+" "+req.path+" - "+req.ip);
  next();
});
app.use(bodyParser.urlencoded({extended: false}));

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

const nameHandler = (req, res) => {
  const { first, last } = (req.method === 'GET') ? req.query : 
    (req.method === 'POST') ? req.body : null;
  res.json({"name": `${first} ${last}`});
};
app.route("/name").get(nameHandler).post(nameHandler);

module.exports = app;
