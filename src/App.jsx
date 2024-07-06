import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import {Routes, Route} from 'react-router-dom'
import './index.css'
import NotFound from './vendorDashboard/components/NotFound'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
