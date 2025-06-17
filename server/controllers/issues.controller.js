const db = require('../config/db'); 

// Get all issues
const getAllIssues = async (req, res) => {
  try {
    const { project_id } = req.query;
    let query = 'SELECT * FROM issues';
    let params = [];

    if (project_id) {
      query += ' WHERE project_id = ?';
      params.push(project_id);
    }

    const [issues] = await db.promise().query(query, params);
    res.json(issues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get issue by ID
const getIssueById = async (req, res) => {
  try {
    const { id } = req.params;
    const [issues] = await db.promise().query('SELECT * FROM issues WHERE id = ?', [id]);

    if (issues.length === 0) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json(issues[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new issue
const createIssue = async (req, res) => {
  try {
    const { title, description, status, project_id } = req.body;

    if (!title || !description || !status || !project_id) {
      return res.status(400).json({ message: 'Title, description, status, and project_id are required' });
    }

    const [projectCheck] = await db.promise().query(
      'SELECT id FROM projects WHERE id = ?',
      [project_id]
    );
    if (projectCheck.length === 0) {
      return res.status(400).json({ message: 'Project not found' });
    }

    const [result] = await db.promise().query(
      'INSERT INTO issues (title, description, status, project_id) VALUES (?, ?, ?, ?)',
      [title, description, status, project_id]
    );

    res.status(201).json({ id: result.insertId, title, description, status, project_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update issue by ID
const updateIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { project_id, title, description, status } = req.body;

    const [result] = await db.promise().query(
      'UPDATE issues SET project_id = ?, title = ?, description = ?, status = ? WHERE id = ?',
      [project_id, title, description, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json({ message: 'Issue updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete issue by ID
const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.promise().query('DELETE FROM issues WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json({ message: 'Issue deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
};
