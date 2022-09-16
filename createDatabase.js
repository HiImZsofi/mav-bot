import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const { get, type } = require('jquery');
import { con } from './database.js'

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE MavDelays", function (err, result) {
        if (err) throw err;
        console.log("Database created");
        con.end();
        process.exit();
      });
  });