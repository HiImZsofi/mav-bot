var sql = "CREATE TABLE mavdelays.delays (trainID VARCHAR(255), delay INT)";
con.query(sql, function(err, result){
	if(err) throw err;
	console.log("Table created");
});