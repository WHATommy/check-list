const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCheckListFolderInput(data) {
    let errors = {}

    data.checkListFolderName = !isEmpty(data.checkListFolderName) ? data.checkListFolderName : '';

    if (validator.isEmpty(data.checkListFolderName)) {
        errors.checkListFolderName = 'Name is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}