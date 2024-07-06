import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'

const Register = ({showLoginHandler}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await fetch(`${API_URL}/vendor/register`,{
        method: 'POST',
        headers :{
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({username,email,password,phonenumber})
      })

      const data = await response.json()
      if(response.ok){
        console.log(data)
        setUsername('')
        setEmail('')
        setPassword('')
        setPhonenumber('')
        alert('Vendor Registration Successful')
        showLoginHandler()
      }else{
        setError(data.error)
      }
    }catch(error){
      console.error('Registration Failed',error)
      alert('Registration Failed')
    }finally {
      setLoading(false)
    }
  }

  return (
      <Container component='main' maxWidth='xs' >
        <Box sx={{display:'flex', alignItems:'center',flexDirection:'column',marginTop:3}}>
          <Typography variant='h4' sx={{color:'#fc8019', fontWeight:700}}>Vendor Registration </Typography>
          <Box component='form' noValidate sx={{mt:1}} onSubmit={handleSubmit}>
            <TextField fullWidth required margin='normal' onChange={(e)=> setUsername(e.target.value)} name='username' value={username} label='Username' autoComplete='Username'/>
            <TextField fullWidth required margin='normal' type='email' onChange={(e)=> setEmail(e.target.value)} name='email' value={email} label='Email Address' autoComplete='Email Address'/>
            <TextField fullWidth required margin='normal' type='password' onChange={(e)=> setPassword(e.target.value)} value={password} name='password' label='Password' autoComplete='Password'/>
            <TextField fullWidth required margin='normal' type='number' onChange={(e)=> setPhonenumber(e.target.value)} value={phonenumber} name='phonenumber' label='Mobile number' autoComplete='Phone Number'/>
            <Button variant='contained' type='submit' fullWidth sx={{ mt: 3, mb: 2 ,height:'40px',backgroundColor:'#fc8019'}}>Register</Button>
          </Box>
        </Box>
      </Container>
  )
}

export default Register
