const express = require('express');
const path = require('path');
const { readAndAppend, readFromFile, writeToFile} = require('./helpers/fsUtils'); 
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public')); 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
 
app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

app.post('/api/notes', (req, res) => {
  const {title, text} = req.body;
 
  if (title && text) {
    const newInput = {
      title,
      text,
    };
    readAndAppend(newInput, './db/db.json');
    const response = {
      status: 'success',
      body: newInput,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);