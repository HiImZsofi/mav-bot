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

let today = new Date();
let date = today.toISOString().split('T')[0];

con.query("USE mavdelays;", function(err){
    if(err) throw err;
})

con.query("RENAME TABLE delays TO `" + date + "`;", function(err){
    if(err) throw err;
    console.log("Table archived as " + date);
    con.end();
    process.exit();
})
