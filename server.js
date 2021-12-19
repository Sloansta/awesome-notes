const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3001;
const data = loadJSON('db/db.json');
const dataArr = [];

if(dataArr.length - 1 > 0)
    dataArr.length = data.length - 1;
else 
    dataArr.length = 0;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.send(data);
}); 

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    req.body.id = uuidv4();
    data.push(req.body);
    saveJSON('db/db.json', data);
    res.json(req.body);
});

app.delete('/api/notes/:id', (req, res) => {
    res.send('Deleting ' + req.params.id);
    console.log(req.params.id);
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    initNotes();
});

function initNotes() {
    data.forEach(element => {
        dataArr.push(element);
        console.log(dataArr);
    });
}

function loadJSON(filename = '') {
    return JSON.parse(
        fs.existsSync(filename)
            ? fs.readFileSync(filename).toString()
            : '""'
    )
}

function saveJSON(filename, json = '') {
    fs.writeFileSync(filename, JSON.stringify(json, null, 2));
}

