import mysql.connector

mydb = mysql.connector.connect(
    host = "127.0.0.1",
    user = "root",
	password = "",
	port = 3306
)

print(mydb)
obj = mydb.cursor();
obj.execute("SELECT SUM(delay) FROM mavdelays.delays;");
result= obj.fetchall()
print(result)