import tweepy

# Authenticate to Twitter
auth = tweepy.OAuthHandler("tiOxv4JZtUPA3GqPwgleFnUgH", "maPuNX6HZscOhodrwc8lpp5tiMVHGbuGzs5HP6JQ13JOVhqMby")
auth.set_access_token("1567913293381091331-lJTkqqYBkVR79eGMzi3FB8bNkGBjFS", "831xsauNmzfyDDAZ2quV0AsaCJU80B0j0hYhjqmFTH6P9")

# Create API object
api = tweepy.API(auth)

try:
    api.verify_credentials()
    print("OK")
except:
    print("Valami rossz")