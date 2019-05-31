const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Budget model
const { Budget } = require('../../models/budget');

// Input validation
const validateBudgetInput = require('../../validation/budget');
const validateBudgetFolderInput = require('../../validation/budgetFolder');

// Retrieve ALL budget logs
router.get('/', (req, res) => {
    Budget.find()
        .sort({ date: -1 })
        .then(budget => res.json(budget))
        .catch(err => res.status(404).json({ noBudgets: 'it is empty here' }));
});

// Retrieve current user's budget folders
router.get('/budgetfolder/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Budget.find({ user: req.user.id })
        .then(userBudget => res.status(200).json(userBudget))
        .catch(err => console.log(err))
});

// Retrieve current user's targeted folder budget logs
router.get('/budgetlog/:budgetfolderid', passport.authenticate('jwt', { session: false }), (req, res) => {
    Budget.findOne({ user: req.user.id })
        .then(budget => {

            budget.budgetFolders.map(folder => {
                if (folder._id == req.params.budgetfolderid) {
                    budget = folder
                }
            });

            res.status(200).json(budget)
        })
        .catch(err => console.log(err))
});

// Create a budget folder
router.post('/budgetfolder/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateBudgetFolderInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    Budget.findOne({ user: req.user.id })
        .then(budget => {

            const newBudgetFolder = {
                user: req.user.id,
                budgetFolderName: req.body.budgetFolderName
            };

            budget.budgetFolders.unshift(newBudgetFolder);

            budget.save()
                .then(budget => res.json(budget))
                .catch(err => console.log(err));
        })
});

// Create a budget log
router.post('/budgetlog/:budgetfolderid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateBudgetInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    Budget.findOne({ user: req.user.id })
        .then(budget => {
            const newBudgetFolder = {
                user: req.user.id,
                name: req.body.name,
                description: req.body.description,
                cost: req.body.cost,
                quanitity: req.body.quanitity
            };

            budget.budgetFolders.map(folder => {
                if (folder._id == req.params.budgetfolderid) {
                    folder.budgetFolderData.unshift(newBudgetFolder)
                }
            });

            budget.save()
                .then(budget => res.status(200).json(budget))
                .catch(err => console.log(err));
        })
});

// Update a budget folder
router.put('/budgetfolder/:budgetfolderid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateBudgetFolderInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    Budget.findOne({ user: req.user.id })
        .then(budget => {

            budget.budgetFolders.map(folder => {
                if (folder._id == req.params.budgetfolderid) {
                    folder.budgetFolderName = req.body.budgetFolderName
                }
            });

            budget.save()
                .then(budget => res.status(204).json(budget))
        });
});

// Update a budget log
router.put('/budgetlog/:budgetfolderid/:budgetdataid', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateBudgetInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    Budget.findOne({ user: req.user.id })
        .then(budget => {

            const newBudgetData = {
                user: req.user.id,
                name: req.body.name,
                weight: req.body.weight,
                reps: req.body.reps
            };

            budget.budgetFolders.map(folder => {
                if (folder._id == req.params.budgetfolderid) {
                    folder.budgetFolderData.map(folderData => {
                        if (folderData._id == req.params.budgetdataid) {
                            folderData.name = newBudgetData.name
                            folderData.weight = newBudgetData.weight
                            folderData.reps = newBudgetData.reps
                        }
                    });
                }
            });

            budget.save()
                .then(budget => res.status(204).json(budget))
        });
});

// Remove a budget folder
router.delete('/budgetfolder/:budgetfolderid', passport.authenticate('jwt', { session: false }), (req, res) => {
    Budget.findOne({ user: req.user.id })
        .then(budget => {

            budget.budgetFolders.map(folder => {
                if (folder._id == req.params.budgetfolderid) {
                    folder.remove()
                }
            });

            budget.save()
                .then(budget => res.status(204).json(budget))
        });
});

// Remove a budget log
router.delete('/budgetlog/:budgetfolderid/:budgetdataid', passport.authenticate('jwt', { session: false }), (req, res) => {
    Budget.findOne({ user: req.user.id })
        .then(budget => {

            budget.budgetFolders.map(folder => {
                if (folder._id == req.params.budgetfolderid) {
                    folder.budgetFolderData.map(folderData => {
                        if (folderData._id == req.params.budgetdataid) {
                            folderData.remove()
                        }
                    });
                }
            });

            budget.save()
                .then(budget => res.status(204).json(budget))
        });
});

module.exports = router;