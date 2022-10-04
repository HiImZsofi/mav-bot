<h1>MÁV-bot</h1>
<h2>What exactly is this bot doing?</h2>
<p>MÁV bot is a fully backend application, built with NodeJS and Python. The application extracts data with various API calls, and pushes it 
into a MySQL database. After 24 hours it executes an SQL query, sums up the data and creates a Twitter post.</p>
<h2>What languages/resources does it use?</h2>
<ul>
    <li>JavaScript: the base of our code is written in JavaScript. We use the NodeJS runtime environment, the database completely relies on this environment as you can see above.</li>
    <li>Python: The Twitter bot is developed in Python, using Tweepy and MySQL connector imports. Authentication and status.update is done automatically in here.</li>
    <li>elvira-api: The backbone of our application. This is a free REST Webservice API for MÁV-START, based on JavaScript and Perl. For further information, please see this link: https://bitbucket.org/oroce/elvira-api/wiki/Home</li>
    <li>SQL: this is for the database, where we store the daily delays. It takes up usually around 2700-3000 lines of data.</li>
</ul>
<h2>Where does it run?</h2>
<p>Currently the application is running in two different docker containers, one for the database and one for the python image. The containers are
 running on Amazon Web Services (Elastic Container Registry) servers.</p>
<h2>Where to see the finished product:</h2>
<p>Right now the bot is fully backend, it sends out one status update to Twitter every 24 hours, at 18:00 GMT+2. If you are interested, visit this link: https://twitter.com/Mennyitkestunk</p>
<h2>Developers: </h2>
<h3>Zsófia Győri: https://github.com/HiImZsofi</h3>
<h3>László Gondi: https://github.com/lacgondi</h3>


