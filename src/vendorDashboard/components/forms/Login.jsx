import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { API_URL } from '../../data/apiPath';

const Login = ({showWelcomeHandler}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/vendor/login`,{
        method :'POST',
        headers:{
          'Content-Type' :'application/json'
        },
        body : JSON.stringify({email,password})
      })
      const data = await response.json()
      if(response.ok){
        console.log(data)
        setEmail('')
        setPassword('')
        alert('Login Success')
        localStorage.setItem('loginToken',data.token)
        showWelcomeHandler()
      }
      const vendorId = data.vendorId
      console.log("Checking for vendorId :", vendorId)
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData = await vendorResponse.json()
      if(vendorResponse.ok){
        const vendorFirmId = vendorData.vendorFirmId
        const vendorFirmName = vendorData.vendor.firm[0].firmName
        console.log('the firmname is..',vendorFirmName)
        console.log('firm id for a vendor is ',vendorFirmId)
        localStorage.setItem('firmId',vendorFirmId)
        localStorage.setItem('firmName',vendorFirmName)
        window.location.reload()
      }
    } catch (error) {
      console.error(error)  
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          
        }}
      >
        <Typography component="h1" variant="h4" sx={{color:'#fc8019', fontWeight:700}}>
          Sign in to Get Started
        </Typography>
        <Box component="form"  noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            value={email}
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e)=>setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=> setPassword(e.target.value)}
            sx={{color:'#fc8019'}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained" 
            sx={{ mt: 3, mb: 2 ,height:'40px',backgroundColor:'#fc8019'}}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
