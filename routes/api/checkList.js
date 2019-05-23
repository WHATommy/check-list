const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// CheckList model
const { CheckList } = require('../../models/checkList');

// Input validation
const validateCheckListInput = require('../../validation/checkList');
const validateCheckListFolderInput = require('../../validation/checkListFolder');

// Retrieve ALL checkList logs
router.get('/', (req, res) => {
    CheckList.find()
        .sort({ date: -1 })
        .then(checkList => res.json(checkList))
        .catch(err => res.status(404).json({ noCheckLists: 'it is empty here' }));
});

// Retrieve current user's checkList folders
router.get('/checklistfolder/', passport.authenticate('jwt', { session: false }), (req, res) => {
    CheckList.find({ user: req.user.id })
        .then(userCheckList => res.status(200).json(userCheckList))
        .catch(err => console.log(err))
});

// Retrieve current user's targeted folder checkList logs
router.get('/checklistlog/:checklistfolderid', passport.authenticate('jwt', { session: false }), (req, res) => {
    CheckList.findOne({ user: req.user.id })
        .then(checkList => {

            checkList.checkListFolders.map(folder => {
                if (folder._id == req.params.checkListfolderid) {
                    checkList = folder
                }
            });

            res.status(200).json(checkList)
        })
        .catch(err => console.log(err))
});

// Create a checkList folder
router.post('/checklistfolder/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateCheckListFolderInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    CheckList.findOne({ user: req.user.id })
        .then(checkList => {

            const newCheckListFolder = {
                user: req.user.id,
                checkListFolderName: req.body.checkListFolderName
            };

            checkList.checkListFolders.unshift(newCheckListFolder);

            checkList.save()
                .then(checkList => res.json(checkList))
                .catch(err => console.log(err));
        })
});

// Create a checkList log
router.post('/checklistlog/:checkListfolderid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateCheckListInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    CheckList.findOne({ user: req.user.id })
        .then(checkList => {
            const newCheckListFolder = {
                user: req.user.id,
                name: req.body.name,
                description: req.body.description,
                cost: req.body.cost,
                quanitity: req.body.quanitity
            };

            checkList.checkListFolders.map(folder => {
                if (folder._id == req.params.checkListfolderid) {
                    folder.checkListFolderData.unshift(newCheckListFolder)
                }
            });

            checkList.save()
                .then(checkList => res.status(200).json(checkList))
                .catch(err => console.log(err));
        })
});

// Update a checkList folder
router.put('/checklistfolder/:checklistfolderid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateCheckListFolderInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    CheckList.findOne({ user: req.user.id })
        .then(checkList => {

            checkList.checkListFolders.map(folder => {
                if (folder._id == req.params.checkListfolderid) {
                    folder.checkListFolderName = req.body.checkListFolderName
                }
            });

            checkList.save()
                .then(checkList => res.status(204).json(checkList))
        });
});

// Update a checkList log
router.put('/checklistlog/:checklistfolderid/:checklistdataid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateCheckListInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    CheckList.findOne({ user: req.user.id })
        .then(checkList => {

            const newCheckListData = {
                user: req.user.id,
                name: req.body.name,
                weight: req.body.weight,
                reps: req.body.reps
            };

            checkList.checkListFolders.map(folder => {
                if (folder._id == req.params.checkListfolderid) {
                    folder.checkListFolderData.map(folderData => {
                        if (folderData._id == req.params.checkListdataid) {
                            folderData.name = newCheckListData.name
                            folderData.weight = newCheckListData.weight
                            folderData.reps = newCheckListData.reps
                        }
                    });
                }
            });

            checkList.save()
                .then(checkList => res.status(204).json(checkList))
        });
});

// Remove a checkList folder
router.delete('/checklistfolder/:checklistfolderid', passport.authenticate('jwt', { session: false }), (req, res) => {
    CheckList.findOne({ user: req.user.id })
        .then(checkList => {

            checkList.checkListFolders.map(folder => {
                if (folder._id == req.params.checkListfolderid) {
                    folder.remove()
                }
            });

            checkList.save()
                .then(checkList => res.status(204).json(checkList))
        });
});

// Remove a checkList log
router.delete('/checklistlog/:checklistfolderid/:checklistdataid', passport.authenticate('jwt', { session: false }), (req, res) => {
    CheckList.findOne({ user: req.user.id })
        .then(checkList => {

            checkList.checkListFolders.map(folder => {
                if (folder._id == req.params.checkListfolderid) {
                    folder.checkListFolderData.map(folderData => {
                        if (folderData._id == req.params.checkListdataid) {
                            folderData.remove()
                        }
                    });
                }
            });

            checkList.save()
                .then(checkList => res.status(204).json(checkList))
        });
});

module.exports = router;