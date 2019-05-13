const express = require('express');
const routes = require('./backend/routes');

let app = express();

app.use('/', routes);

app.listen(8000, () => {
    console.log("Initialized on port 8000")
});