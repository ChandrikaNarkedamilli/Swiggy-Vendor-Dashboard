import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import AddProduct from '../components/forms/AddProduct'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import SideBar from '../components/SideBar'
import Welcome from '../components/Welcome'
import { Box, Container, CssBaseline } from '@mui/material'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showFirm, setShowFirm] = useState(false)
  const [showProduct, setShowProduct] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken')
    if(loginToken){
      setShowLogout(true)
    }
  })

  const logoutHandler =()=>{
    confirm('Are you sure, you want to logout?')
    localStorage.removeItem('loginToken')
    localStorage.removeItem('firmId')
    localStorage.removeItem('firmName')
    setShowLogout(false)
  }

  const showLoginHandler =()=>{
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }

  const showRegisterHandler =()=>{
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }

  const showFirmHandler =()=>{
  if(showLogout){
    setShowFirm(true)
    setShowLogin(false)
    setShowRegister(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }else{
    alert('Please Login')
    setShowLogin(true)
  }
}

  const showProductHandler = () =>{
    if(showLogout){
      setShowProduct(true)
      setShowLogin(false)
      setShowRegister(false)
      setShowFirm(false)
      setShowWelcome(false)
      setShowAllProducts(false)
    }else{
      alert('Please Login')
      setShowLogin(true)
    }
  }

  const showWelcomeHandler = () =>{
    setShowWelcome(true)
    setShowProduct(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowFirm(false)
    setShowAllProducts(false)
  }

  const showAllProductsHandler = () =>{
    if(showLogout){
      setShowAllProducts(true)
      setShowWelcome(false)
      setShowProduct(false)
      setShowLogin(false)
      setShowRegister(false)
      setShowFirm(false)
    }else{
      alert('Please Login')
      setShowLogin(true)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <CssBaseline />
    <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogout={showLogout} logoutHandler={logoutHandler} />
    <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showAllProductsHandler={showAllProductsHandler} />
      <Container component="main" sx={{ marginTop: '80px', marginLeft: '240px', flexGrow: 1 }}>
        {showLogin  && <Login showWelcomeHandler={showWelcomeHandler} />}
        {showRegister && <Register showLoginHandler={showLoginHandler} />}
        {showFirm && showLogout && <AddFirm />}
        {showProduct  && showLogout && <AddProduct />}
        {showWelcome && <Welcome />}
        {showAllProducts && showLogout && <AllProducts />}
      </Container>
    </Box>
  )
}

export default LandingPage
