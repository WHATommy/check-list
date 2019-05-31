const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BudgetFolderDataSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    cost: {
        type: Number
    },
    quantity: {
        type: Number
    },
    check: {
        type: Boolean,
        default: false
    }
});

const BudgetFoldersSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    checkListFolderName: {
        type: String,
        required: true
    },
    checkListFolderData: [BudgetFolderDataSchema]
});

const BudgetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    checkListFolders: [BudgetFoldersSchema]
});

const Budget = mongoose.model('budget', BudgetSchema);
const BudgetFolder = mongoose.model('budgetfolders', BudgetFoldersSchema);
const BudgetData = mongoose.model('budgetdata', BudgetFolderDataSchema);

module.exports = { Budget, BudgetFolder, BudgetData };