//Imports
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

//Stores data fetched from the API
let trains;

//Fetches data from api and stores it in a variable
async function fetchData(){
	const res = await fetch('http://apiv2.oroszi.net/elvira/maps')
	trains = await res.json();
}

//Inserts into the database 
function sendToDatabase(){
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	});
	for (let i = 0; i < trains.length; i++) {
	var sql = "INSERT INTO mavdelays.delays (trainID, delay) VALUES ('"+trains[i].train_number+"',"+trains[i].delay+")";  
	con.query(sql, function (err, result) {  
	if (err) throw err;  
	console.log("1 record inserted");  
	}); 
	}
}

//Call the required functions
fetchData();
setInterval(() => {
	sendToDatabase();
},10000);
// sendToDatabase();