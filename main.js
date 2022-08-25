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

async function fetchData(){
	let obj;

	const res = await fetch('http://apiv2.oroszi.net/elvira/maps')

	obj = await res.json();
  
	console.log(obj[1].train_number);
}

fetchData();