import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Url from '../utils/api';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${Url}/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p>Loading project details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!project) return <p>No project found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
      <p className="mb-4"><strong>Description:</strong> {project.description}</p>
      <p className="mb-4"><strong>Status:</strong> {project.status}</p>
      <p className="mb-4"><strong>Created By:</strong> {project.created_by}</p>

      <Link
        to="/projects"
        className="inline-block mt-6 text-blue-600 hover:underline"
      >
        ← Back to Projects
      </Link>
    </div>
  );
};

export default ProjectDetails;
