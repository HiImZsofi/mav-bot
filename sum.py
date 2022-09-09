import mysql.connector

mydb = mysql.connector.connect(
    host = "127.0.0.1",
    user = "root",
	password = "",
	port = 3306
)

print(mydb)
obj = mydb.cursor();
obj.execute("SELECT * FROM mavdelays.delays WHERE trainID = 5512407");
result= obj.fetchall()
for row in result:
    print(row)