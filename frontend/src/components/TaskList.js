import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/tasks/').then(res => setTasks(res.data));
  }, []);

  const deleteTask = id => {
    axios.delete(`/tasks/${id}`)
      .then(() => setTasks(ts => ts.filter(t => t.id !== id)));
  };

  return (
    <>
      {tasks.length === 0 ? (
        <p className="text-center">No tasks yet. Click “Add Task” above to create one!</p>
      ) : (
        tasks.map(t => (
          <Card className="mb-3" key={t.id}>
            <Card.Body>
              <Card.Title>{t.title}</Card.Title>
              <Card.Text>Due: {t.due_date || '—'}</Card.Text>
              <Card.Text>Status: {t.status}</Card.Text>
              <Link to={`/edit/${t.id}`} className="me-2">
                <Button variant="outline-success" size="sm">
                  <FaEdit /> Edit
                </Button>
              </Link>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteTask(t.id)}
              >
                <FaTrash /> Delete
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </>
  );
}
