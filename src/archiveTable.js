import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const { get, type } = require('jquery');
import { con } from './database.js'

var today = new Date();
var date = today.toISOString().split('T')[0];

con.query("USE MavDelays;", function(err){
    if(err) throw err;
})

con.query("RENAME TABLE delays TO `" + date + "`;", function(err){
    if(err) throw err;
    console.log("Table archived as " + date);
})

con.query("CREATE TABLE MavDelays.delays (trainID VARCHAR(255), delay INT, time TIMESTAMP)", function(err){
    if(err) throw err;
    console.log("Table created");
    con.end();
    process.exit();
});