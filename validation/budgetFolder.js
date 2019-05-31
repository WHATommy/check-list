const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBudgetFolderInput(data) {
    let errors = {}

    data.budgetFolderName = !isEmpty(data.budgetFolderName) ? data.budgetFolderName : '';

    if (validator.isEmpty(data.budgetFolderName)) {
        errors.budgetFolderName = 'Name is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}