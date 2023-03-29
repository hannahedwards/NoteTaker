const express = require('express');
const path = require('path');
const { readAndAppend, readFromFile, writeToFile} = require('./helpers/fsUtils'); 
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json()); 
app.use(express.static('public')); 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
 
app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

app.post('/api/notes', (req, res) => {//creates new note
  const {title, text} = req.body;
 
  if (title && text) {//title it note title and text is the note body
    const newInput = {
      title,
      text,
    };
    readAndAppend(newInput, './db/db.json');//note added
    const response = {
      status: 'added',
      body: newInput,
    };

    res.json(response);
  } else {//note error
    res.json('try again');
  }
});

app.listen(PORT, () =>//triggers app to run
  console.log(`App listening at http://localhost:${PORT}`)
);