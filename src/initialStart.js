import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const { get, type } = require('jquery');
import { con } from './database.js'

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

con.query("CREATE TABLE MavDelays.delays (trainID VARCHAR(255), delay INT, time TIMESTAMP)", function(err, result){
    if(err) throw err;
    console.log("Table created");
    con.end();
    process.exit();
});
