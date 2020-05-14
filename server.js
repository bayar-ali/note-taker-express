const express = require("express")
const app = express();
const fs = require("fs")
const port = require("path")



app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public"))


app.get("/notes", (req, res)=>{
    res.sendFile(__dirname + "/public/notes.html")
})

app.get("/api/notes", (req, res)=>{
    const notes = res.sendFile(__dirname + "/", "utf-8", (err, data)=>{
        if (err) throw (err); 
        res.json(json.parse(data))
    })
})

app.post("/api/notes", (req, res)=>{
    const savedNotes = fs.readFileSync(path.join(__dirname + ""), "utf-8")
    const parsedSavedNotes = json.parse(savedNotes)
    const noteAdd = req.body
    const uniqueID = 
    notesAdd.id = uniqueID
    parsedSavedNotes.push(noteAdd);
    fs.writeFileSync(path.join(__dirname + "/"), json.stringfiy(parsedSavedNotes))
    res.json(noteAdd)

})


app.get("*", (req, res)=>{
    res.sendFile(__dirname + "/public/notes.html")
})


app.listen(PORT, ()=>{
    console.log(`server listing on http://localhost:${PORT}`)
})