const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const data = loadJSON('db.json');

app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/index.html'));
});

app.get('/notes', (req, res) => {
    res.send(data.table);
});

app.post('/add-note', (req, res) => {
    console.log(req.body);
    createNewNote(req.body);
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    initNotes();
});

function initNotes() {
    data.table.forEach(element => {
        console.log(element);
    });
}

function createNewNote(obj) {
    data.table.push(obj);
    saveJSON('db.json', data);
    console.log(data.table);
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

