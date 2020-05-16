/* const express = require("express")
const app = express();
const fs = require("fs")
const port = require("path")
const PORT = process.env.PORT || 8081; */




/* app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public"))


app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname + "/public/index.html")
    )
})


app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname + "/public/notes.html")
    )
})

app.get("/api/notes", (req, res) => {
    const notesData = res.readFileSync(path.join(__dirname + "/db/db.json", "utf-8", (err, data) => {
        if (err) throw (err);
        res.json(json.parse(data))
    })
    )
})

app.get("/api/notes/:id", (req, res) => {
    let noteId = req.params.id;
    let notesData = fs.readFileSync(path, join(__dirname + "/db/db.json"), "utf-8");
    let notedataJson = json.parse(notesData);

    for (let i = 0; i < notedataJson.length; i++) {
        if (notedataJson[i].id === noteId) {
            console.log(notedataJson[i]);

            return res.json(notedataJson[i]);
        }
    }

})

// work in progress // needs work 
app.post("/api/notes", (req, res)=>{
    const savedNotes = fs.readFileSync(path.join(__dirname + ""), "utf-8");
    const parsedSavedNotes = json.parse(savedNotes)
    const noteAdd = req.body
    const uniqueID = 
    notesAdd.id = uniqueID
    parsedSavedNotes.push(noteAdd);
    fs.writeFileSync(path.join(__dirname + "/"), json.stringfiy(parsedSavedNotes))
    res.json(noteAdd)
    

})


app.get("*", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html")
})


app.listen(PORT, ()=>{
    console.log(`server listing on http://localhost:${PORT}`)
}) */


const express = require("express")
const app = express()
const fs = require("fs")
const PORT = process.env.PORT || 8082
const path = require("path")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// this is required to get the layout provided to us
app.use(express.static("public"))

//takes you to notes page
app.get("/notes", (req, res)=>{
    res.sendFile(__dirname + "/public/notes.html")
})
// takes you to the api with the notes
app.get("/api/notes", (req, res)=>{
    const notes = fs.readFile(__dirname + "/db/db.json", "utf-8", (err, data)=>{
        if (err) throw (err);
        res.json(JSON.parse(data))
    })
})
// adds a new note and gives a new id to it
app.post("/api/notes", (req, res)=>{
    let savedNotes = fs.readFileSync(path.join(__dirname + "/db/db.json"), "utf-8")
    const parsedSavedNotes = JSON.parse(savedNotes)
    // requesting body to then add .id to it
    const noteAdd = req.body
    const uniqueID = Math.floor(Math.random() * 999999999)
    //note add portion here
    noteAdd.id = uniqueID
    // console.log(noteAdd.id)
    //pushes the new note to api with the id
    parsedSavedNotes.push(noteAdd);
    fs.writeFileSync(path.join(__dirname + "/db/db.json"), JSON.stringify(parsedSavedNotes))
    res.json(noteAdd)
})

app.delete("/api/notes/:id", (req, res)=>{
    let savedNotes = fs.readFileSync(path.join(__dirname + "/db/db.json"), "utf-8")
    //need to parse the notes and get or request the id back
    const parsedSavedNotes = JSON.parse(savedNotes)
    const notesId = parseInt(req.params.id)
    //basically this checks for the id to see if they match and then deletes it
    let noteAdd = parsedSavedNotes.filter((allNotes)=>{
        // this deletes the note when id doesn match, thanks Michelle!
        return allNotes.id !== notesId
    })
    //displays notes api after deleted note
    fs.writeFileSync(path.join(__dirname+ "/db/db.json"), JSON.stringify(noteAdd))
    console.log("successfully deleted note.")
})
// * takes you back to home page
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/notes.html")
})

app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`)
})