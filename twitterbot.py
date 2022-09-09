import tweepy
#from sum import result
import schedule
import time 

# Authenticate to Twitter
auth = tweepy.OAuthHandler("tiOxv4JZtUPA3GqPwgleFnUgH", "maPuNX6HZscOhodrwc8lpp5tiMVHGbuGzs5HP6JQ13JOVhqMby")
auth.set_access_token("1567913293381091331-lJTkqqYBkVR79eGMzi3FB8bNkGBjFS", "831xsauNmzfyDDAZ2quV0AsaCJU80B0j0hYhjqmFTH6P9")

# Create API object
api = tweepy.API(auth)

#summary
import mysql.connector

mydb = mysql.connector.connect(
    host = "127.0.0.1",
    user = "root",
	password = "",
	port = 3306
)

#print(mydb)
obj = mydb.cursor();
obj.execute("SELECT SUM(delay) FROM mavdelays.delays;");
result= obj.fetchall()
#print(result)

def tweet():
    api.update_status(result)
    #print("szia")



schedule.every().day.at("20:16").do(tweet)

while True:
    schedule.run_pending()
    time.sleep(1)
    
