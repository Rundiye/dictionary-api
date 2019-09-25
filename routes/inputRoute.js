const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Input = require('../models/Input');
const Dictionary = require('../models/Dictionary');

// GET '/api/dictionaries/:dictionaryId/inputs/:inputId'   => to retrieve a specific task
router.get('/dictionaries/:dictionaryId/inputs/:inputId', (req, res) => {
  Input.findById(req.params.taskId)
    .then((foundTask) => {
      res.json(foundTask);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// POST '/api/inputs'      => to create a new task
router.post('/inputs', (req, res) => {
  const { domain, range } = req.body;

  Input.create({
    domain: domain,
    range: range,
    dictionary: dictionaryID
  })
    .then((newInputDocument) => {
      Dictionary.findByIdAndUpdate(dictionaryID, { $push: { inputs: newInputDocument._id } })
        .then((theResponse) => {
          res.status(201).json(theResponse);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// PUT '/api/inputs/:id'    => to update a specific input
router.put('/inputs/:id', (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Input.findByIdAndUpdate(id, req.body)
    .then(() => {
      res
        .status(201)
        .json({ message: `Input with ${id} updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE '/api/inputs/:id'     => to delete a specific input
router.delete('/inputs/:id', (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)
      .json({ message: 'Specified id is not valid' });
    return;
  }

  Input.findByIdAndRemove(id)
    .then(() => {
      res
        .status(202)
        .json({ message: `Input with ${id} removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
