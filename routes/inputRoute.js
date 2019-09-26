const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Input = require('../models/Input');
const Dictionary = require('../models/Dictionary');
// const createError = require('http-errors');

// const {
//   validationForm
// } = require('../helpers/middlewares.js');

// GET '/api/dictionaries/:dictionaryId/inputs/:inputId'   => to retrieve a specific input
router.get('/dictionaries/:dictionaryId/inputs/:inputId', (req, res) => {
  Input.findById(req.params.inputId)
    .then((foundInput) => {
      res.json(foundInput);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// POST '/api/inputs'      => to create a new input
router.post('/inputs', (req, res) => {
  const { domain, range, dictionaryID } = req.body;

  // const newInput = req.body;
  // const inputs = Input.find();

  // inputs.forEach(input => {
  //   console.log(newInput);
  //   if (newInput.domain === input.domain) {
  //     return createError(402);
  //   } else if (newInput.domain === newInput.range) {
  //     return createError(423);
  //   }
  // });

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
