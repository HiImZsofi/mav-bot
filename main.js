



var mysql = require('mysql');

var con = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "",
	port: 3306
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE MavDelays", function (err, result) {
	  if (err) throw err;
	  console.log("Database created");
	});
});

/*function delays() {
	for (let i = 1; i <= 40000; i++) {
		$.ajax({
			type: "GET",
			url: "http://apiv2.oroszi.net/elvira/maps",
			dataType: "json",
			data: {},
			success: function (data) {
				if (data[i] !== undefined) {
					console.log(data[i].train_number + "\n" + data[i].delay);
				}
			}
		})
	}
}*/