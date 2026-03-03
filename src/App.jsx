import React from 'react'
import Todos from './pages/Todos';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div>
      <Routes>

        <Route path='/' element={
          <ProtectedRoute>
            <Todos />
          </ProtectedRoute>}
        />

        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
