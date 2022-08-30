import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const { get, type } = require('jquery');
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "",
	port: 3306
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE MavDelays", function (err, result) {
        if (err) throw err;
        console.log("Database created");
        process.exit();
      });
  });