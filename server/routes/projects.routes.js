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


// GET /api/projects - get all projects
router.get('/', getAllProjects);

// GET /api/projects/:id - get project by ID
router.get('/:id', getProjectById);

// POST /api/projects - create new project
router.post('/create', createProject);

// PUT /api/projects/:id - update a project
router.put('/update/:id', updateProject);

// DELETE /api/projects/:id - delete a project
router.delete('/delete/:id', deleteProject);

module.exports = router;

