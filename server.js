const PORT = process.env.PORT || 4001;
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const dataBase = require('./db/db.json');
const { v4: uuidv4 } = require('uuid'); //unique id npm package


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


//Routes 

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.get('/api/notes', (req,res) => {
    res.json(dataBase);
});

app.post('/api/notes', (req, res) => {
    let newEntry = req.body;
    newEntry.id = uuidv4();
    dataBase.push(newEntry);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(dataBase));
    res.json();
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


/*The following HTML routes should be created:

GET /notes should return the notes.html file.

GET * should return the index.html file.

The following API routes should be created:

GET /api/notes should read the db.json file and return all saved notes as JSON.

POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

*/