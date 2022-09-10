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

//Connect to the database
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

//Stores data fetched from the API
let trains;

//Fetches data from api and stores it in a variable
async function fetchData(){
	const res = await fetch('http://apiv2.oroszi.net/elvira/maps')
	trains = await res.json();
	console.log("Fetched")
}

//Checks if the data already exists in the database
let sqlExists;
function existsQuery(){
	return new Promise((resolve, rejects)=>{
		con.query(sqlExists, function(err, result) {
			if (err) return rejects(err);
			return resolve(result[0].answer);
		})
	})
}

//! not working
let sqlDelayDifference;
function shouldUpdateQuery(){
	return new Promise((resolve, rejects)=>{
		con.query(sqlDelayDifference, function(err, result) {
			if(err) return rejects(err);
			return resolve(result[0].delay);
		})
	})
}

//Inserts new row into the database
let insertSQL;
function insertQuery(){
	return new Promise((resolve, rejects)=>{
		con.query(insertSQL, function (err) {  
			if (err) return rejects(err);  
			return resolve("1 record inserted");  
		});
	})
}

//Updates the already existing rows in the database
let updateSQL;
function updateQuery(){
	return new Promise((resolve, rejects)=>{
		con.query(updateSQL, function(err){
			if(err) return rejects(err);
			return resolve("1 record updated");
		})
	})
}

//Interacts with the database
async function sendToDatabase(){
	var checkExists;
	var shouldUpdate;

	for (let i = 0; i < trains.length; i++) {
		//Checks if the delay value from the API is undefined
		if(trains[i].delay !== undefined){
			sqlExists = "SELECT EXISTS(SELECT * FROM mavdelays.delays WHERE trainID = '"+trains[i].train_number+"') AS answer;"
			sqlDelayDifference = "SELECT delay FROM mavdelays.delays WHERE trainID = '"+trains[i].train_number+"'";
			insertSQL = "INSERT INTO mavdelays.delays (trainID, delay, time) VALUES ('"+trains[i].train_number+"',"+trains[i].delay+", CURRENT_TIMESTAMP)";
			updateSQL="UPDATE mavdelays.delays SET delay = "+trains[i].delay+", time = CURRENT_TIMESTAMP WHERE trainID = '"+trains[i].train_number+"';";

			//Checks if it should update or insert into the database
			checkExists = await existsQuery();
			if(checkExists == 0){
				console.log(await insertQuery());
			}else if(checkExists === 1){ //! second part of if condition not working
				shouldUpdate = await shouldUpdateQuery(); //! not working
				if (shouldUpdate - trains[i].delay != 0) {
					console.log(await updateQuery());
				}
			}
			}
			else{
				continue;
			}
		}
}

//Call the required functions
setInterval(() => {
	fetchData();
}, 5000);
setInterval(() => {
	sendToDatabase();
},10000);