import { createRequire } from 'module'
const require = createRequire(import.meta.url);
var mysql = require('mysql');

export var con = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "",
	port: 3306
});