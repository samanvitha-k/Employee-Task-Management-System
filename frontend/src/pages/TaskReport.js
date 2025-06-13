// src/pages/TaskReport.js
// src/pages/TaskReport.js
import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaExclamationCircle, FaClock, FaClipboardCheck } from 'react-icons/fa'

export default function TaskReport() {
  const [rows, setRows] = useState([])
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    axios.get('/tasks/').then(r => setRows(r.data))
  }, [])

  const filtered = rows.filter(r =>
    r.title.toLowerCase().includes(filterText.toLowerCase()) ||
    r.status.includes(filterText.toLowerCase())
  )

  const columns = [
    { name: '#', width: '60px', selector: (_, i) => i+1, sortable: true },
    { name: 'Title', selector: r => r.title, sortable: true },
    { name: 'Due', selector: r => r.due_date || '—', sortable: true },
    {
      name: 'Status',
      selector: r => r.status,
      sortable: true,
      cell: r => {
        let color='secondary', Icon=FaExclamationCircle
        if(r.status==='pending'){ color='warning'; Icon=FaClock }
        if(r.status==='completed'){ color='success'; Icon=FaClipboardCheck }
        return <span className={`badge bg-${color}`}><Icon className="me-1"/>{r.status}</span>
      }
    }
  ]

  return (
    <div className="d-flex vh-100">
      <Sidebar/>
      <div className="flex-fill bg-light p-4 overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Task Report</h4>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{to:'/'}}>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Task Report</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <DataTable
          columns={columns}
          data={filtered}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search..."
              className="form-control"
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
            />
          }
        />
      </div>
    </div>
  )
}
