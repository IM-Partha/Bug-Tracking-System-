import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Url from '../utils/api';

const Projectpage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get('http://localhost:5000/api/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch projects');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this project?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${Url}/projects/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // After deletion, refresh project list
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">All Projects</h1>
        <Link
          to={'/create'}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Create New Project
        </Link>
      </div>

      {loading && <p>Loading projects...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && projects.length === 0 && (
        <div className="bg-white p-6 rounded shadow-md">
          <p className="text-gray-700">No projects available. Add a new project.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
          <p className="text-gray-600 mb-4">{project.status}</p>
            <div className="flex space-x-4">
              <Link
                to={`/projectdetails/${project.id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>

              <Link
                to={`/updateproject/${project.id}`}
                className="text-green-600 hover:underline"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(project.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projectpage;
