import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Url from '../utils/api';

const UpdateIssuepage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'open',
    project_id: '', // hidden field, kept in state
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssueDetails();
  }, [id]);

  const fetchIssueDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${Url}/issues/gateissues/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { title, description, status, project_id } = res.data;
      setForm({
        title: title || '',
        description: description || '',
        status: status || 'open',
        project_id: project_id || '', // keep project_id but do not show in form
      });
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load issue');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // Send entire form including hidden project_id
      await axios.put(`${Url}/issues/updateissue/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Issue updated!');
      navigate('/issues');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading issue data...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 border rounded shadow bg-white mt-6"
    >
      <h2 className="text-xl font-bold mb-4">Update Issue</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

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

      {/* Note: No input for project_id, so it is hidden from the form */}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
      >
        Update Issue
      </button>
    </form>
  );
};

export default UpdateIssuepage;
