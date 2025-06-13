import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Table } from 'react-bootstrap'

export default function View() {
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    axios.get('/tasks/').then(r=>setTasks(r.data))
  },[])

  return (
    <Container style={{ padding: '2rem 0' }}>
      <h3>View Task</h3>
      <Table bordered hover>
        <thead>
          <tr><th>#</th><th>Title</th><th>Due</th><th>Status</th></tr>
        </thead>
        <tbody>
          {tasks.map((t,i)=>(
            <tr key={t.id}>
              <td>{i+1}</td>
              <td>{t.title}</td>
              <td>{t.due_date||'—'}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
