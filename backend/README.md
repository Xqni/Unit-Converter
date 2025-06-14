# Backend

This is where the logic for handling conversion resides. More specifically it is the server I wrote using Express along with some middlewares such as CORS for cross origin request handling.
```javascript
// imports express and cors (dont really need cors but for dev env I do need it)
const express = require('express')
const cors = require('cors')

// initialize/create an express app
const app = express()

// middlewares
app.use(express.json()) // to be able to parse json data
app.use(cors()) // to allow requests from different origins
app.use(express.static('dist')) // to display front-end build
```

You can check the index.js file to see my RESTful APIs and how I am converting between different units and such.

```javascript
app.use(express.static('dist')) // to display front-end build
```
It is worth noting that this line of code is extermely helpful in development process. If I visit my localhost:3001 when the server is running instead of display a blank page or a text message, I can display my entire frontend and interact with it. This is exactly what is happening when deploying it to Render. It creates a new build of the frontend UI to ensure that any changes made there are reflected on the server as well, updates the 'dist' directory from frontend to backend and then displays it.

In case you are wondering what are those scripts that do all of this building and deploying.
```javascript
"scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",
    "build:ui": "rm -rf dist && cd ../main && npm run build && cp -r dist ../backend",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

On Render, you can simply type ```npm build:ui && npm start``` to start the server and interact with the application
