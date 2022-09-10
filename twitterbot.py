import tweepy
import schedule
import time 
import mysql.connector

# Authenticate to Twitter
auth = tweepy.OAuthHandler("tiOxv4JZtUPA3GqPwgleFnUgH", "maPuNX6HZscOhodrwc8lpp5tiMVHGbuGzs5HP6JQ13JOVhqMby")
auth.set_access_token("1567913293381091331-lJTkqqYBkVR79eGMzi3FB8bNkGBjFS", "831xsauNmzfyDDAZ2quV0AsaCJU80B0j0hYhjqmFTH6P9")

# Create API object
api = tweepy.API(auth)

#Connect to database
mydb = mysql.connector.connect(
    host = "127.0.0.1",
    user = "root",
	password = "",
	port = 3306
)

#Get summed up delay value from the database
obj = mydb.cursor();
obj.execute("SELECT SUM(delay) FROM mavdelays.delays;");
result= obj.fetchall()

#Tweet out results function
def tweet():
    api.update_status(result)
    #print("szia")


#Schedule tweet() call
schedule.every().day.at("20:16").do(tweet)
while True:
    schedule.run_pending()
    time.sleep(1)