const express = require('express');
const router = express.Router();

const { addEmployee, getEmployees } = require('../controllers/db.js');

router.post('/api/employee', addEmployee);
router.get('/api/employees', getEmployees)

module.exports = router;