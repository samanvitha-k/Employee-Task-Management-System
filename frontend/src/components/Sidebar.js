import React from 'react'
import { Nav, Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Sidebar(){
  const nav = useNavigate()
  const loc = useLocation()

  return (
    <div className="bg-white border-end" style={{ width: 220 }}>
      <Nav className="flex-column p-3">
        <Nav.Link as={Link} to="/"       active={loc.pathname==='/'}>🏠 Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/add"    active={loc.pathname==='/add'}>✚ Add Task</Nav.Link>
        <Nav.Link as={Link} to="/view"   active={loc.pathname==='/view'}>📋 View Task</Nav.Link>
        <Nav.Link as={Link} to="/assign" active={loc.pathname==='/assign'}>✉ Assign Task</Nav.Link>
      </Nav>
      <div className="p-3">
        <Button variant="outline-danger" onClick={()=>{
          localStorage.clear()
          nav('/login')
        }}>
          🔒 Logout
        </Button>
      </div>
    </div>
  )
}
