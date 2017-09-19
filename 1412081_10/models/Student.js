var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema(
    {
        code: {type: String, unique: true, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true},
        score: {type: Number, required: true}
    }
);

//Export model
module.exports = mongoose.model('Student', StudentSchema, 'students');
