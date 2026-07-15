import React, { useState, useEffect } from 'react';
import { notificationAPI } from '../services/api';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = JSON.parse(localStorage.getItem('user'))?.user_id || 1;

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await notificationAPI.getByUser(userId);
      setNotifications(response.data);
    } catch (err) {
      setError('Failed to load notifications');
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>🔔 Notifications</h1>
      {error && <div style={{ color: 'red' }}>❌ {error}</div>}
      <div style={{ marginTop: '20px' }}>
        {notifications.map((notif) => (
          <div key={notif.notification_id} style={{ background: notif.is_read ? '#f5f5f5' : '#e3f2fd', padding: '15px', marginBottom: '10px', borderRadius: '8px', borderLeft: '4px solid #0f3460' }}>
            <p>{notif.message}</p>
            <small>Created: {notif.created_at}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;