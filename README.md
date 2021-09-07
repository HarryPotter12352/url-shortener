# URL shortener

This is a URL shortener created by me in my free time, this uses the express.js framework, ejs template engine, and mongoose for interacting with mongodb

# Setup
Clone the repository using `git clone https://github.com/HarryPotter12352/url-shortener.git`, now in the main directory, run `npm install` to install all of the dependencies.

Now make a new file called `config.json` and in that enter content of the following format
```json
{"mongo_url" : "your database's url", "port": 5500}
```
Now run `node .` to start the project and enjoy!