const express = require('express');
const router = express.Router();

const {
  getAllIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
} = require('../controllers/issues.controller');

// GET /api/issues 
router.get('/', getAllIssues);

// GET /api/issues/:id 
router.get('/gateissues/:id', getIssueById);

// POST /api/issues 
router.post('/create/', createIssue);

// PUT /api/issues/:id 
router.put('/updateissue/:id', updateIssue);

// DELETE /api/issues/:id 
router.delete('/deleteissue/:id', deleteIssue);

module.exports = router;
