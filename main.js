//Imports
import { rejects } from 'assert';
import { createRequire } from 'module'
const require = createRequire(import.meta.url);
import fetch from "node-fetch";
import { resolve } from 'path';
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

var sqlExists;
function existsQuery(){
	return new Promise((resolve, rejects)=>{
		con.query(sqlExists, function(err, result) {
			if (err) return rejects(err);
			setTimeout(() => {
				return resolve(result[0].answer);
			}, 200);
		})
	})
}

// var sqlDelayDifference;
// function delayQuery(){
// 	return new Promise((resolve, rejects)=>{
// 		con.query(sqlDelayDifference, function(err, result){
// 			if(err) return rejects(err)
// 			setTimeout(() => {
				
// 				return resolve(result[0].delay);
// 			}, 200);
// 		})
// 	})
// }

var sql;
function insertQuery(){
	return new Promise((resolve, rejects)=>{
		con.query(sql, function (err) {  
			if (err) return rejects(err);  
			return resolve("1 record inserted");  
		});
	})
}

var updateSQL;
function updateQuery(){
	return new Promise((resolve, rejects)=>{
		con.query(updateSQL, function(err){
			if(err) return rejects(err);
			return resolve("1 record updated");
		})
	})
}

//Inserts into the database 
async function sendToDatabase(){
	
	var checkExists;
	
	//var delayInDB;

	//todo edit checkexists if else and sql request
	for (let i = 0; i < trains.length; i++) {
		//todo check for undefined and continue of so

		if(trains[i].delay !== undefined){
			sqlExists = "SELECT EXISTS(SELECT * FROM mavdelays.delays WHERE trainID = '"+trains[i].train_number+"') AS answer;"
			//sqlDelayDifference = "SELECT delay FROM mavdelays.delays WHERE trainID='"+trains[i].train_number+"'";
			sql = "INSERT INTO mavdelays.delays (trainID, delay, time) VALUES ('"+trains[i].train_number+"',"+trains[i].delay+", CURRENT_TIMESTAMP)";
			updateSQL="UPDATE mavdelays.delays SET delay = "+trains[i].delay+", time = CURRENT_TIMESTAMP WHERE trainID = '"+trains[i].train_number+"';";
	
			checkExists = await existsQuery();
				if(checkExists == 0){
					console.log(await insertQuery());
				}else if(checkExists == 1){
					console.log(await updateQuery());
				}
			}
			else{
				continue;
			}
		}

}

//Call the required functions
fetchData();
setInterval(() => {
	sendToDatabase();
},10000);