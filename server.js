const path = require('path');
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});  

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});  

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });