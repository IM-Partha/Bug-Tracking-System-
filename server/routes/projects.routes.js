const express = require('express');
const router = express.Router();


// Controller functions will handle these (create, read, update, delete)
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projects.controller');


// GET /api/projects 
router.get('/', getAllProjects);

// GET /api/projects/:id 
router.get('/:id', getProjectById);

// POST /api/projects 
router.post('/create', createProject);

// PUT /api/projects/:id 
router.put('/update/:id', updateProject);

// DELETE /api/projects/:id 
router.delete('/delete/:id', deleteProject);

module.exports = router;

