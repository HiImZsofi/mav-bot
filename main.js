import { createRequire } from 'module'
const require = createRequire(import.meta.url);
import fetch from "node-fetch";
const { get, type } = require('jquery');
var mysql = require('mysql');


var con = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "",
	port: 3306
});

let trains;

async function fetchData(){
	
	const res = await fetch('http://apiv2.oroszi.net/elvira/maps')

	trains = await res.json();

	console.log(trains[1].train_number);
}

function tableEmtpyCheck(){
	var empty=true;
	con.connect(function(err) {  
		if (err) throw err;  
		var sql = "SELECT COUNT(*) FROM mavdelays.delays";  
		con.query(sql, function (err, result) {  
		if (err) throw err;  
		empty=false; 
		})
	})
	return empty;
}

function sendToDatabase(){
	if(tableEmtpyCheck()){ 
		con.connect(function(err) {  
			if (err) throw err;  
			console.log("Connected!"); 
	
			for (let i = 0; i < trains.length; i++) {
			var sql = "INSERT INTO mavdelays.delays (trainID, delay) VALUES ('"+trains[i].train_number+"',"+trains[i].delay+")";  
			con.query(sql, function (err, result) {  
			if (err) throw err;  
			console.log("1 record inserted");  
			}); 
			}
			}	
		)
	}else{
		//update
	}	
}

fetchData();
setInterval(() => {
	sendToDatabase();
},10000);
// sendToDatabase();