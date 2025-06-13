import React from 'react';
import TaskList from '../components/TaskList.js';

export default function Home() {
  return (
    <div>
      <h2 style={{ padding: 20 }}>🏠 My Tasks</h2>
      <TaskList />
    </div>
  );
}

