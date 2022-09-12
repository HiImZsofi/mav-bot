import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const { get, type } = require('jquery');
var mysql = require('mysql');
var cron = require('node-cron');

var con = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "",
	port: 3306
});

cron.schedule('35 12 * * *', () => {
    var today = new Date();
    var date = today.toISOString().split('T')[0];
    
    con.query("USE mavdelays;", function(err){
        if(err) throw err;
    })
    
    con.query("RENAME TABLE delays TO `" + date + "`;", function(err){
        if(err) throw err;
        console.log("Table archived as " + date);
    })

    con.query("CREATE TABLE mavdelays.delays (trainID VARCHAR(255), delay INT, time TIMESTAMP)", function(err){
        if(err) throw err;
        console.log("Table created");
        con.end();
        process.exit();
    });
});