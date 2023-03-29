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
 
