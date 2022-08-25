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

fetch('http://apiv2.oroszi.net/elvira/maps')
  .then(response => response.json())
  .then(commits => console.log(commits[1].train_number));

function delays() {
	for (let i = 1; i < 90000; i++) {
		$.ajax({
			type: "GET",
			url: "http://apiv2.oroszi.net/elvira/maps",
			dataType: "json",
			data: {
				train_number: 5515503,
			},
			success: function (data) {
				if (data[i] !== undefined) {
					console.log(data[i].train_number + "\n" + data[i].delay);
				}
			}
		})
	}
	console.log(train);
}