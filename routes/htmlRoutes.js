const router = require("express").Router(); 
const path = require("path");

// HTML GET
router.get("/notes", function(_req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

router.get("/*", function(_req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = router