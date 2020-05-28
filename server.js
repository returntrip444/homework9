// Dependencies
// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");
const notes = []
var app = express();
var PORT = 3000;
app.use(express.static("public"));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// html routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})
//api routes
app.get("/api/notes", function(req, res){
    fs.readFile("./db/db.json", function(err, data) {
        if (err) throw err 
        console.log("line 26", JSON.parse(data))
        res.json(JSON.parse(data))
    })
})
app.post("/api/notes", function(req, res){
    console.log(req.body)
    fs.readFile("./db/db.json", function(err, data){
        // if (err) throw err
        var parseNote = data;
        for (let i = 0; i < parseNote.length; i++) {
            const element = JSON.parse(parseNote[i]);
            notes.push(element)  
        }
        notes.push(req.body)
        console.log("line 44", notes)   
    })
    fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
        if (err) throw err
        console.log("it worked")
        res.json(true)
    })
})
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });


