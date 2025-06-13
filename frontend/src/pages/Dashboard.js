// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Row, Col, Card, Button, Table,
  Navbar, Nav, NavDropdown, Form
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaClock, FaSpinner, FaCheckCircle, FaEdit, FaExchangeAlt } from 'react-icons/fa'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {
  const user = localStorage.getItem('user') || 'User'
  const [tasks, setTasks] = useState([])

  useEffect(()=> {
    axios.get('/tasks/').then(r=>setTasks(r.data))
  },[])

  const counts = {
    pending:    tasks.filter(t=>t.status==='pending').length,
    inProgress: tasks.filter(t=>t.status==='in-progress').length,
    completed:  tasks.filter(t=>t.status==='completed').length,
  }

  return (
    <>
      <Navbar bg="light" className="px-3">
        <Navbar.Brand> Employee Task Management</Navbar.Brand>
        <Nav className="ms-auto">
          <NavDropdown title={user} align="end">
            <NavDropdown.Item onClick={()=>{
              localStorage.clear()
              window.location = '/login'
            }}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>

      <div className="d-flex vh-100">
        <Sidebar/>

        <div className="flex-fill bg-light p-4 overflow-auto">
          <h4>Assigned Task Report</h4>

          <Row className="g-3 mb-4">
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body className="d-flex align-items-center">
                  <FaClock size={32} className="text-warning me-3"/>
                  <div>
                    <div className="text-muted">Pending</div>
                    <h2>{counts.pending}</h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body className="d-flex align-items-center">
                  <FaSpinner size={32} className="text-info me-3"/>
                  <div>
                    <div className="text-muted">In-progress</div>
                    <h2>{counts.inProgress}</h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body className="d-flex align-items-center">
                  <FaCheckCircle size={32} className="text-success me-3"/>
                  <div>
                    <div className="text-muted">Completed</div>
                    <h2>{counts.completed}</h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Form.Control
            type="search"
            placeholder="Search..."
            className="mb-3"
            style={{ maxWidth: 300 }}
          />

          <h5>Task Report</h5>
          <Table hover bordered responsive className="bg-white shadow-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Due</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length===0 &&
                <tr><td colSpan="5" className="text-center py-4">No tasks</td></tr>
              }
              {tasks.map((t,i)=>(
                <tr key={t.id}>
                  <td>{i+1}</td>
                  <td>{t.title}</td>
                  <td>{t.due_date||'—'}</td>
                  <td>
                    <Button size="sm" variant={
                      t.status==='pending'      ? 'danger' :
                      t.status==='in-progress' ? 'warning' :
                      'success'
                    }>
                      {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                    </Button>
                  </td>
                  <td>
                    <Button
                      as={Link}
                      to={`/add/${t.id}`}
                      size="sm"
                      variant="outline-primary"
                      className="me-2"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      as={Link}
                      to={`/assign/${t.id}`}
                      size="sm"
                      variant="outline-secondary"
                    >
                      <FaExchangeAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}
