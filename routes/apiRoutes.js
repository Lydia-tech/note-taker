const router = require('express').Router();
const fs = require('fs');
const data = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

// console.log(`your cryptographically generated 122 character value is ${idGeneration}`)
// console.log(data.length);
const databaseArry = [...data];
// console.log(databaseArry);
router.get('/notes', (_req, res) => {
	res.json(databaseArry)
	// data.getNotes().then((notes) => {
	//     return res.json(notes)
	//     // typeof NodeError
	// }).catch((err) => {res.send(err.code || err.message || err.status).json(err)
});
// err.code || err.message || err.status).json(err.message || err.code || err.status).json(err.message !==null ? err.message.toString() : err.status !==null  ? err.status :|| err.code || err.status)

// saving a note to the db


router.post('/notes', (req, res) => {
	//console.log(req.body.title)
  //console.log(req.body.text)
  let newNote = req.body
  newNote.id = uuidv4();
	databaseArry.push(newNote);
  console.log(databaseArry);
  fs.writeFile('./db/db.json', JSON.stringify(databaseArry), (err, data) => {
    if (err) {
      console.log(err)
    }
  });
  res.send(JSON.stringify(databaseArry));
	//   data.addNote(req.body).then((note) => {res.json(note).catch((err) => {res.send(err.code || err.status || err.message).json(err)})})
	//   })
});
router.delete('/notes/:id', (req, res) => {
	try {
		data
			.removeNote(req.params.id)
			.then(() => res.json({ ok: true }))
			.catch(err => res.send(err.message).json(err));
	} catch (err) {
		return err.status(500).json(err);
	}
});

module.exports = router;
