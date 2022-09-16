# Imports
import tweepy
import mysql.connector
import config

# Authenticate to Twitter
auth = tweepy.OAuthHandler(config.consumer_token, config.consumer_secret)
auth.set_access_token(config.access_token, config.access_token_secret)

# Create API object
api = tweepy.API(auth)

# Connect to database
mydb = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="",
    port=3306
)

# Get summed up delay value from the database
def sumQuery():
    obj = mydb.cursor()
    obj.execute("SELECT SUM(delay) FROM mavdelays.delays;")
    result = obj.fetchall()
    tweetMessage = "A MÁV ma " + str(result[0][0]) + " percet késett összesen."
    return tweetMessage


def clearTable():
    obj = mydb.cursor()
    obj.execute("DROP TABLE mavdelays.delays;")
    obj.execute(
        "CREATE TABLE mavdelays.delays (trainID VARCHAR(255), delay INT, time TIMESTAMP);")
    obj.fetchall()


# Tweet out results function
def tweet():
    api.update_status(sumQuery())
    clearTable()
