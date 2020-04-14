const express = require('express');
const app = express();
const projectRoute = express.Router();
const mongoose = require('mongoose');
let projectSchema = require('../models/Project');

// Add Project
projectRoute.route('/project/create').post((req, res, next) => {
  projectSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// List Project
projectRoute.route('/project/projects').get((req, res) => {
  projectSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Project
projectRoute.route('/project/read/:id').get((req, res) => {
  projectSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Assign member
projectRoute.route('/project/assign/:id').post((req, res, next) => {
  projectSchema.findById(req.params.id, function (error, project) {
    if (error) return next(error);
    for (let memberId of req.body.members) {
      project.members.push(mongoose.Types.ObjectId(memberId));
    }
    project.save(function (err) {
      if (err) return next(err);
      res.json({ status: 'done' });
    });
  });
})

// Update Project
projectRoute.route('/project/update/:id').put((req, res, next) => {
  projectSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete Project
projectRoute.route('/project/delete/:id').delete((req, res, next) => {
  projectSchema.findOneAndDelete({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = projectRoute;