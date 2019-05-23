const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCheckListInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.cost = !isEmpty(data.cost) ? data.cost : '';
    data.quantity = !isEmpty(data.quantity) ? data.quantity : '';

    if (validator.isEmpty(data.name)) {
        errors.name = 'CheckList name is required';
    }

    /*if (validator.isEmpty(data.description)) {
        errors.description = 'description is required';
    }*/

    if (validator.isEmpty(data.cost)) {
        errors.cost = 'cost is required';
    }

    if (validator.isEmpty(data.quantity)) {
        errors.quantity = 'quantity is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}