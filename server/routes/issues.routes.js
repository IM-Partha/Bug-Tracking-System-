const express = require('express');
const router = express.Router();

const {
  getAllIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
} = require('../controllers/issues.controller');

// GET /api/issues - get all issues
router.get('/', getAllIssues);

// GET /api/issues/:id - get issue by ID
router.get('/gateissues/:id', getIssueById);

// POST /api/issues - create new issue
router.post('/create/', createIssue);

// PUT /api/issues/:id - update an issue
router.put('/updateissue/:id', updateIssue);

// DELETE /api/issues/:id - delete an issue
router.delete('/deleteissue/:id', deleteIssue);

module.exports = router;
