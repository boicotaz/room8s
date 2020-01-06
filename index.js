const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
var cors = require("cors");
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tolis",
  database: "home_site",
  insecureAuth: true,
  port: 3306  
});

connection.connect(function(err) {
  if (err) {
    console.error(err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

server.listen(process.env.PORT || 8082, () => {
  console.log(`app is now listening to port ${process.env.PORT || 8082}`);
  console.log(__dirname);
});

app.use("/public", express.static(__dirname + "/public"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var router = app.Router();

app.get("/", (req, res) => {
  
  res.sendFile(__dirname + "/webpager.html");
});

app.get("/viewRulesDetails", (req, res) => {
  res.sendFile(__dirname + "/rules-details.html");
});

app.get("/viewDetails", (req, res) => {
  res.sendFile(__dirname + "/details.html");
});

app.get("/getDetails", (req, res) => {
  connection.query("select * from jobs", function(error, results, fields) {
    if (error) throw error;
    res.send(results);
    console.log("we in get request");
  });
});

app.get("/getRulesDetails", (req, res) => {
  connection.query("select * from Rules", function(error, results, fields) {
    if (error) throw error;
    res.send(results);
    console.log("we in get request");
  });
});

app.post("/post", function(req, res) {
  console.log(req.body);
  console.log("in post");

  connection.query("show tables;", function(error, results, fields) {
    // if (error) throw error;
    console.log("it returned", results[0]["Tables_in_home_site"]);
  });

  let post = req.body;

  connection.query("insert into jobs set ?", post, function(
    err,
    results,
    fields
  ) {
    if (err) throw error;
    console.log(results);
  });

  res.send({ redirectUrl: "/viewDetails" });
});

app.post("/postRules", function(req, res) {
  let post = req.body;
  connection.query("insert into Rules set ?", post, function(
    err,
    results,
    fields
  ) {
    if (err) throw error;
    console.log(results);
  });
  res.send({ redirectUrl: "/viewRulesDetails" });
  // res.redirect("/viewRulesDetails");
});
