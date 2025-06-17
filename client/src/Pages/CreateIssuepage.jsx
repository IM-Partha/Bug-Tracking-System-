import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Url from '../utils/api';

const CreateIssueForm = () => {
  const [form, setForm] = useState({
    project_id: '',
    title: '',
    description: '',
    status: 'open',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // <-- Initialize navigation

  useEffect(() => {
    const storedProjectId = localStorage.getItem('projectId');
    if (storedProjectId) {
      setForm(prev => ({ ...prev, project_id: storedProjectId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${Url}/issues/create`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Issue created!');
      navigate('/issues'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Create issue failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded shadow bg-white">
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <label className="block mb-4">
        <span className="text-gray-700 font-semibold mb-1 block">Project ID:</span>
        <input
          type="text"
          name="project_id"
          value={form.project_id}
          readOnly
          className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-semibold mb-1 block">Title:</span>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-semibold mb-1 block">Description:</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded resize-y"
          rows={4}
        />
      </label>

      <label className="block mb-6">
        <span className="text-gray-700 font-semibold mb-1 block">Status:</span>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </label>

      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
        Create Issue
      </button>
    </form>
  );
};

export default CreateIssueForm;
