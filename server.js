// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const DB = require("./Develop/db/db");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));


// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});


app.get('/api/notes', async (req, res) => {
  try {  
    let currentNotes = await DB.readNotes()
    console.log(currentNotes);
    res.json(currentNotes)
  } catch (e){
    console.log(e);
  }
})

// API Post
app.post('/api/notes', async (req, res) => {
  const notes = req.body;
  let currentNotes = await DB.readNotes()
  await DB.writeNotes([...currentNotes, notes]) 
  res.json(notes)
})

// API Delete Chosen ID
app.delete('/api/notes/:id', async (req, res) => {
  const chosenID = req.params.id;
  const notes = req.body;
  console.log(chosenID);
  let currentNotes = await DB.readNotes()
  const remainingNotes = currentNotes.filter((notes) => {
    return notes.id !== chosenID
  })
  await DB.writeNotes([...remainingNotes])

  res.json(notes)
  console.log("The note has been deleted");
})
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
