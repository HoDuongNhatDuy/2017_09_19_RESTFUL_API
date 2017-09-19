var Student = require('../models/Student');
var GlobalController = require('../controllers/GlobalController');

exports.list = function(req, res, next){

    Student.find({}).sort('code').exec(function(error, students){
        if (error){
            res.json({
                status: 0,
                data: {},
                errors: ["An error has occurred"]
            });
            return;
        }

        return res.json({
            status: 1,
            data: students
        })
    });
};

exports.get = function(req, res, next){
    Student.findOne({_id: req.params.id}, function(error, student) {
        if (error) {
            res.json({
                status: 0,
                data: {},
                errors: ["An error has occurred"]

            });
            return;
        }

        if (!student){
            res.json({
                status: 0,
                data: {},
                errors: ["Student not found"]
            });
            return;
        }

        res.json({
            status: 1,
            data: student
        })
    });
};

exports.insert = function (req, res, next) {
    var error_list = [];

    var validate_empty_list = ['code', 'name', 'email', 'score'];
    var validated_result = GlobalController.validateEmpty(validate_empty_list, req.body);

    for(var item in validated_result) {
        if (!validated_result[item])
            error_list.push("Invalid " + item);
    }

    if (error_list.length > 0) {
        res.json({
            status: 0,
            data: {},
            errors: error_list
        });
        return;
    }

    Student.find({code: req.body.code}, function(error, students) {
        if (error) {
            res.json({
                status: 0,
                data: {},
                errors: ["An error has occurred"]

            });
            return;
        }

        if (students.length > 0){
            res.json({
                status: 0,
                data: {},
                errors: ["This student already exists"]
            });
            return;
        }

        var newStudent = new Student({
            code: req.body.code,
            name: req.body.name,
            email: req.body.email,
            score: req.body.score,
        });

        newStudent.save();
        res.json({
            status: 1,
            data: newStudent
        });
    });
};

exports.update = function (req, res, next) {
    Student.findOne({_id: req.params.id}, function(error, student) {
        if (error) {
            res.json({
                status: 0,
                data: {},
                errors: [["An error has occurred"]]

            });
            return;
        }

        if (!student){
            res.json({
                status: 0,
                data: {},
                errors: ["Student not found"]
            });
            return;
        }

        updateData = {};
        if (req.body.code)
            updateData.code = req.body.code;
        if (req.body.name)
            updateData.name = req.body.name;
        if (req.body.email)
            updateData.email = req.body.email;
        if (req.body.score)
            updateData.score = req.body.score;

        student.update(updateData, function(error, student){
            if (error){
                res.json({
                    status: 0,
                    data: {},
                    errors: ["An error has occurred"]
                });
                return;
            }

            res.json({
                status: 1,
                data: student
            })
        });
    });
};

exports.delete = function (req, res, next) {
    Student.findByIdAndRemove(req.params.id, function (error, student) {
        if (error) {
            res.json({
                status: 0,
                data: {},
                errors: ["An error has occurred"]
            });
            return;
        }

        if (!student){
            res.json({
                status: 0,
                data: {},
                errors: ["Student not found"]
            });
            return;
        }

        res.json({
            status: 1,
            data: student
        })
    });

};
