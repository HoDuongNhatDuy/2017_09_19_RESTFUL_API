var Student = require('../models/Student');

exports.validateEmpty = function(fields, data){
    var res = {};
    fields.forEach(function (field, index, p3) {
        if (typeof data[field] === 'undefined' || !data[field])
            res[field] = false;
        else
            res[field] = true;
    })

    return res;
}