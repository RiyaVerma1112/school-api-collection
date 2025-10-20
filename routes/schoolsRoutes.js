const express = require('express'); 
const { getSchools, getSchoolById, addSchool, getSortedSchools } = require('../controllers/schoolsController');

// router object
const router = express.Router()

// routes

// GET all schools list - GET METHOD - REMOVE
router.get('/getall' , getSchools) ;

// GET SCHOOLS BY ID - REMOVE
router.get('/get/:id' , getSchoolById)

// add School 
router.post('/addSchool'  , addSchool)

// GET SCHOOL SORTED BY PROXIMITY
router.get('/listSchools' , getSortedSchools)

module.exports = router 
