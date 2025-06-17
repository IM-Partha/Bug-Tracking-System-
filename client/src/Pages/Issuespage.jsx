import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Url from '../utils/api';

const Issuespage = () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${Url}/issues`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIssues(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch issues');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${Url}/issues/deleteissue/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchIssues();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Issues</h1>

      <Link
        to={'/createissues'}
         className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 inline-block"
      >
        Create Issue
      </Link>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {issues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <ul>
          {issues.map((issue) => (
            <li
              key={issue.id}
              className="mb-2 border p-3 rounded shadow flex justify-between items-center"
            >
              <div>
               <div>
  <p className="text-sm text-gray-600"><strong>Project ID:</strong> {issue.project_id}</p>
  <h3 className="font-bold text-lg">{issue.title}</h3>
  <p className="text-gray-700">{issue.description}</p>
  <p className="text-sm text-blue-600 mt-1"><strong>Status:</strong> {issue.status}</p>
</div>

              </div>
              <div className="flex gap-2">
              
                <Link
                 to={`/updateissues/${issue.id}`}
                  className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 text-white"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(issue.id)}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Issuespage;
