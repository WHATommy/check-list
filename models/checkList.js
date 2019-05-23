const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckListFolderDataSchema = new Schema({
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

const CheckListFoldersSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    checkListFolderName: {
        type: String,
        required: true
    },
    checkListFolderData: [CheckListFolderDataSchema]
});

const CheckListSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    checkListFolders: [CheckListFoldersSchema]
});

const CheckList = mongoose.model('checklist', CheckListSchema);
const CheckListFolder = mongoose.model('checklistfolders', CheckListFoldersSchema);
const CheckListData = mongoose.model('checklistdata', CheckListFolderDataSchema);

module.exports = { CheckList, CheckListFolder, CheckListData };