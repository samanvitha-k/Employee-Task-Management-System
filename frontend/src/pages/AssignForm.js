// src/pages/AssignForm.js
import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function AssignForm() {
  const { id } = useParams()
  const navigate = useNavigate()               // ← ensure navigate is defined

  const [form, setForm] = useState({
    assignee: '',
    company: '',
    title: '',
    status: 'pending',
    allocation_date: '',
    deadline: ''
  })

  useEffect(() => {
    if (id) {
      axios.get(`/tasks/${id}`)
        .then(res => {
          setForm(f => ({
            ...f,
            title: res.data.title,
            status: res.data.status
          }))
        })
    }
  }, [id])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios.post(`/tasks/${id}/assign`, {
      assignee:        form.assignee,
      company:         form.company,
      title:           form.title,
      status:          form.status,
      allocation_date: form.allocation_date || null,
      deadline:        form.deadline        || null
    })
    .then(() => navigate('/'))
    .catch(err => {
      alert('Assign failed: '+ JSON.stringify(err.response?.data))
    })
  }

  return (
    <Container style={{ maxWidth: 600, padding: '2rem 0' }}>
      <h3>Assign Task</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Assign To</Form.Label>
          <Form.Select name="assignee" value={form.assignee} onChange={handleChange} required>
            <option value="">Select user</option>
            <option value="jones">jones</option>
            <option value="admin">admin</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Company</Form.Label>
          <Form.Select name="company" value={form.company} onChange={handleChange} required>
            <option value="">Select company</option>
            <option value="Others">Others</option>
            <option value="Companie3">Companie3</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Task Title</Form.Label>
          <Form.Control name="title" value={form.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select name="status" value={form.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In‑progress</option>
            <option value="completed">Completed</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Allocation Date</Form.Label>
          <Form.Control type="date" name="allocation_date" value={form.allocation_date} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Deadline</Form.Label>
          <Form.Control type="date" name="deadline" value={form.deadline} onChange={handleChange} />
        </Form.Group>

        <Button variant="secondary" onClick={() => navigate('/')}>Close</Button>
        <Button type="submit" className="ms-2">Submit</Button>
      </Form>
    </Container>
  )
}
