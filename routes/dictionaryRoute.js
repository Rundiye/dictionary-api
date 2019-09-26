const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Dictionary = require('../models/Dictionary');

// POST '/dictionaries'
router.post('/dictionaries', (req, res) => {
  const { title } = req.body;

  Dictionary.create({ title, inputs: [] })
    .then((response) => {
      res
        .status(201)
        .json(response);
    })
    .catch((err) => {
      res
        .status(500)
        .json(err);
    });
});

// GET '/dictionaries' => to get all the dictionaries
router.get('/dictionaries', (req, res, next) => {
  Dictionary.find()
    .populate('inputs')
    .then(allTheDictionaries => {
      res.json(allTheDictionaries);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET '/api/dictionaries/:id' => to get a specific projects
router.get('/dictionaries/:id', (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)
      .json({ message: 'Specified id is not valid' });
    return;
  }

  Dictionary.findById(id)
    .populate('inputs')
    .then((foundDictionary) => {
      res.status(200).json(foundDictionary);
    })
    .catch((err) => {
      res.res.status(500).json(err);
    });
});

// PUT '/api/dictionaries/:id'=> to update a specific dictionary
router.put('/dictionaries/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Dictionary.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Dictionary with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE '/api/dictionaries/:id'   => to delete a specific project
router.delete('/dictionaries/:id', (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Dictionary.findByIdAndRemove(id)
    .then(() => {
      res
        .status(202)
        .json({ message: `Dictionary with ${id} was removed successfully.` });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
