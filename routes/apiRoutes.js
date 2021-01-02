const router = require('express').Router();
const fs = require('fs');
const data = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

const databaseArry = [...data];
// console.log(databaseArry);
router.get('/notes', (_req, res) => {
	res.json(databaseArry)
});

router.post('/notes', (req, res) => {
	//console.log(req.body.title)
  //console.log(req.body.text)
  let newNote = req.body
  newNote.id = uuidv4();
	databaseArry.push(newNote);
  console.log(databaseArry);

  // saving a note to the db
  fs.writeFile('./db/db.json', JSON.stringify(databaseArry), (err, data) => {
    if (err) {
      console.log(err)
    }
  });
  res.send(JSON.stringify(databaseArry));
	
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
