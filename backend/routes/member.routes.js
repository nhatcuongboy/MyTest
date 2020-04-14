// routes/member.routes.js

const express = require("express");
const memberRoute = express.Router();
const memberSchema = require("../models/Member");
const { check, validationResult } = require('express-validator');

// Create
memberRoute.post("/member/create",
    [
        check('name')
            .not()
            .isEmpty()
            .isLength({ min: 1 })
            .withMessage('Name must be atleast 1 characters long'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
            const member = new memberSchema({
                name: req.body.name,
                phone: req.body.phone,
                birthday: req.body.birthday
            });
            member.save().then((response) => {
                res.status(201).json({
                    message: "Member successfully created!",
                    result: response
                });
            }).catch(error => {
                res.status(500).json({
                    error: error
                });
            });
        }
    });

// Get Members
memberRoute.route('/member/members').get((req, res) => {
    memberSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single Member 
memberRoute.route('/member/read/:id').get((req, res, next) => {
    memberSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json(data)
        }
    })
})

// Update Member
memberRoute.route('/member/update/:id').put((req, res, next) => {
    memberSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Member successfully updated!')
        }
    })
})


// Delete Member
memberRoute.route('/member/delete/:id').delete((req, res, next) => {
    memberSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = memberRoute;