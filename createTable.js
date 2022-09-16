import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const { get, type } = require('jquery');
import { con } from './database.js'

var sql = "CREATE TABLE mavdelays.delays (trainID VARCHAR(255), delay INT, time TIMESTAMP)";
con.query(sql, function(err, result){
	if(err) throw err;
	console.log("Table created");
	con.end();
	process.exit();
});