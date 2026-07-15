import React, { useState, useEffect } from 'react';
import { reportAPI } from '../services/api';

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await reportAPI.getAll();
      setReports(response.data);
    } catch (err) {
      setError('Failed to load reports');
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>📄 Reports</h1>
      {error && <div style={{ color: 'red' }}>❌ {error}</div>}
      <div style={{ marginTop: '20px' }}>
        {reports.map((report) => (
          <div key={report.report_id} style={{ background: '#f9f9f9', padding: '15px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h3>{report.report_title}</h3>
            <p>{report.report_content}</p>
            <small>Created: {report.created_at}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;