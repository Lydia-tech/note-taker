const router = require("express").Router();
const fs = require('fs');
const data = require("../db/db.json");
const idGeneration = require('crypto').randomBytes(64).toString('hex');

console.log(`your cryptographically generated 122 character value is ${idGeneration}`)

router.get('/notes', (_req, res) => {
    data.getNotes().then((notes) => {
        return res.json(notes)
        // typeof NodeError
    }).catch((err)) => {res.send(err.code || err.message || err.status).json(err)
})
// err.code || err.message || err.status).json(err.message || err.code || err.status).json(err.message !==null ? err.message.toString() : err.status !==null  ? err.status :|| err.code || err.status)
router.post('/notes', (req, res) => {
    data.addNote(req.body).then((note) => {res.json(note).catch((err) => {res.send(err.code || err.status || err.message).json(err)})})
})

router.delete('/notes/:id', (req, res) => {
    try {
    data
      .removeNote(req.params.id)
      .then(() => res.json({ ok: true }))
      .catch((err) => res.send(err.message).json(err));
    } catch (err) { return err.status(500).json(err)}
    })

  module.exports = router;