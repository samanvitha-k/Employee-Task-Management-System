import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Login({ setLoggedIn }) {
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const nav = useNavigate()

  const onChange = e => {
    const { name, type, checked, value } = e.target
    setForm(f => ({ ...f, [name]: type==='checkbox' ? checked : value }))
  }

  const onSubmit = e => {
    e.preventDefault();
    localStorage.setItem('token', 'dummy-token');
    axios.defaults.headers.common['Authorization'] = `Bearer dummy-token`;
    setLoggedIn(true);
    nav('/');
  }
  return (
    <Container style={{ maxWidth: 400, padding: '2rem 0' }}>
      <h2>🔒 Login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email" name="email" value={form.email}
            onChange={onChange} required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password" name="password" value={form.password}
            onChange={onChange} required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="remember">
          <Form.Check
            type="checkbox" label="Remember me"
            name="remember" checked={form.remember}
            onChange={onChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary">Login</Button>
      </Form>
    </Container>
  )
}
