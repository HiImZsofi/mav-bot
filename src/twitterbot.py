# Imports
import os
import tweepy
import mysql.connector
import config
from dotenv import load_dotenv

# Load envionmental variables
load_dotenv()

# Authenticate to Twitter
auth = tweepy.OAuthHandler(config.consumer_token, config.consumer_secret)
auth.set_access_token(config.access_token, config.access_token_secret)

# Create API object
api = tweepy.API(auth)

# Connect to database
mydb = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    port=os.getenv("DB_PORT")
)

obj = mydb.cursor()
# Get summed up delay value from the database


def sumQuery():
    obj.execute("SELECT SUM(delay) FROM MavDelays.delays;")
    result = obj.fetchall()
    tweetMessage = "A MÁV ma " + str(result[0][0]) + " percet késett összesen."
    return tweetMessage


def emptyTable():
    obj.execute("TRUNCATE TABLE MavDelays.delays;")
    obj.fetchall()


# Tweet out results function


def tweet():
    # api.update_status(sumQuery())
    print(sumQuery())
    emptyTable()


tweet()
