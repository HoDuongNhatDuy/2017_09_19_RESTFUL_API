var express = require('express');
var router = express.Router();
var APIStudentController = require('../../controllers/APIStudentController');
router.get('/', APIStudentController.list);
router.get('/:id', APIStudentController.get);
router.post('/', APIStudentController.insert);
router.put('/:id', APIStudentController.update);
router.delete('/:id', APIStudentController.delete);


module.exports = router;
