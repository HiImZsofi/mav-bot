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

	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	});
}

//Inserts into the database 
function sendToDatabase(){
	var checkExists;

	for (let i = 0; i < trains.length; i++) {
		var sqlSelect = "SELECT EXISTS(SELECT * FROM mavdelays.delays WHERE trainID = '"+trains[i].train_number+"') AS answer"
		con.query(sqlSelect, function(err, result, fields) {
			if (err) throw err;
			checkExists = result[0].answer;
		})

		setTimeout(() => {
			if(checkExists==0){
				var sql = "INSERT INTO mavdelays.delays (trainID, delay, time) VALUES ('"+trains[i].train_number+"',"+trains[i].delay+", CURRENT_TIMESTAMP)";  
				con.query(sql, function (err, result) {  
					if (err) throw err;  
					console.log("1 record inserted");  
				}); 
			}else if(checkExists==1){
				var updateSQL= "UPDATE mavdelays.delays SET delay = "+trains[i].delay+", time = CURRENT_TIMESTAMP WHERE trainID = '"+trains[i].train_number+"';";
				con.query(updateSQL, function(err){
					if(err) throw err;
					console.log("1 record updated");
				})
			}
		}, 200);
		}
}

//Call the required functions
fetchData();
setInterval(() => {
	sendToDatabase();
},10000);