import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios';
import Dashboard from './pages/Dashboard.js'
import Login     from './pages/Login.js'
import Edit      from './pages/Edit.js'
import View      from './pages/View.js'
import Assign    from './pages/AssignForm.js'



axios.interceptors.request.use(cfg => {
  const t = localStorage.getItem('token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'))
  }, [])

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !loggedIn
              ? <Login setLoggedIn={setLoggedIn}/>
              : <Navigate to="/" replace/>
          }
        />

        <Route
          path="/"
          element={
            loggedIn
              ? <Dashboard/>
              : <Navigate to="/login" replace/>
          }
        />

        <Route
          path="/add"
          element={
            loggedIn
              ? <Edit/>
              : <Navigate to="/login" replace/>
          }
        />
        <Route
          path="/add/:id"
          element={
            loggedIn
              ? <Edit/>
              : <Navigate to="/login" replace/>
          }
        />

        <Route
          path="/view"
          element={
            loggedIn
              ? <View/>
              : <Navigate to="/login" replace/>
          }
        />

        <Route
          path="/assign"
          element={
            loggedIn
              ? <Assign/>
              : <Navigate to="/login" replace/>
          }
        />
        <Route
          path="/assign/:id"
          element={
            loggedIn
              ? <Assign/>
              : <Navigate to="/login" replace/>
          }
        />

        <Route
          path="*"
          element={<Navigate to={loggedIn ? "/" : "/login"} replace/>}
        />
      </Routes>
    </Router>
  )
}
