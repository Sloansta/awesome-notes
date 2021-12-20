const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
//const fs = require('fs');
//const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const data = require('./db/db.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    initNotes();
});

//Just for doing testing
function initNotes() {
    data.forEach(element => {
        console.log(element);
    });
}



