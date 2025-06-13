import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

export default function TaskForm() {
  const [form, setForm] = useState({ title: '', due_date: '', status: 'pending' })
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      axios.get(`/tasks/${id}`)
        .then(res => setForm(res.data))
        .catch(() => navigate('/'))
    }
  }, [id, navigate])

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const req = id
      ? axios.put(`/tasks/${id}`, form)
      : axios.post('/tasks/', form)

    req.then(() => navigate('/'))
  }

  return (
    <Container style={{ maxWidth: 600, padding: '2rem 0' }}>
      <h3>{id ? 'Update Task' : 'Add Task'}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="due_date"
            value={form.due_date || ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In-progress</option>
            <option value="completed">Completed</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary">
          {id ? 'Update' : 'Add'} Task
        </Button>
      </Form>
    </Container>
  )
}
