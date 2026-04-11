import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RestaurantListPage from './pages/RestaurantListPage'

function App() {

  return (
    <>
      <Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/restaurants" element={<RestaurantListPage />} />
	  </Routes>
    </>
  )
}

export default App
