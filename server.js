const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
let noteObj = {
    table: []
};

app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/index.html'));
});

app.post('/add-note', (req, res) => {
    console.log(req.body);
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});