const express = require('express');
const app = express();
const cors = require('cors');

let serverRunTime = null;
let lastUpdateTime = null;

app.use(cors())

app.get('/api/get', (req, res) => {
    res.json({
        serverRunTime,
        lastUpdateTime
    });
});

app.get('/api/update', (req, res) => {
    lastUpdateTime = Date.now();
    res.send('ok');
});

app.listen(3000, () => {
    serverRunTime = Date.now();
});
