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

var sql = "CREATE TABLE mavdelays.delays (trainID VARCHAR(255), delay INT, time TIMESTAMP)";
con.query(sql, function(err, result){
	if(err) throw err;
	console.log("Table created");
	process.exit();
});