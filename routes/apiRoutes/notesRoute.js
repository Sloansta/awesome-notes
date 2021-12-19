const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
let data = require('../../db/db.json');

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../db/db.json'));
});

router.get('/notes', (req, res) => {
    res.send(data);
}); 

router.post('/notes', (req, res) => {
    console.log(req.body);
    req.body.id = uuidv4();
    data.push(req.body);
    saveJSON(path.join(__dirname, '../../db/db.json'), data);
    res.json(req.body);
});

router.delete('/notes/:id', (req, res) => {
    console.log(req.params.id);
    const postDelete = data.filter(el => {
        return el.id != req.params.id;
    });
    saveJSON(path.join(__dirname, '../../db/db.json'), postDelete);
    data = loadJSON(path.join(__dirname, '../../db/db.json'));
    console.log(data);
    res.json(data);
});



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

module.exports = router;