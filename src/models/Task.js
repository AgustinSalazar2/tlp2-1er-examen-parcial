const {model, Schema} = require('mongoose');

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    finished: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    active: {
        type: Boolean,
        default: true
    }
},{
    versionKey: false,
    timestamps: true
});

module.exports = model('Tasks', TaskSchema);