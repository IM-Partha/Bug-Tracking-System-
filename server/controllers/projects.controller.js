const db = require('../config/db'); // Your MySQL connection instance

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const [projects] = await db.promise().query('SELECT * FROM projects');
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const [projects] = await db.promise().query('SELECT * FROM projects WHERE id = ?', [id]);

    if (projects.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(projects[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/// crarte New Project
const createProject = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { username } = req.user; // username from JWT payload

    if (!title || !description || !status) {
      return res.status(400).json({ message: 'Title, description and status are required' });
    }

    const [result] = await db.promise().query(
      'INSERT INTO projects (title, description, status, created_by) VALUES (?, ?, ?, ?)',
      [title, description, status, username]
    );
    const projectId = result.insertId;
    res.status(201).json({ id: result.insertId, title, description, status, created_by: username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update project by ID
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(400).json({ message: 'Title, description and status are required' });
    }

    const [result] = await db.promise().query(
      'UPDATE projects SET title = ?, description = ?, status = ? WHERE id = ?',
      [title, description, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete project by ID
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.promise().query('DELETE FROM projects WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
