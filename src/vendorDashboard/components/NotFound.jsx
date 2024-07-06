import React from 'react'
import {Stack, Typography} from '@mui/material'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <Link to='/' style={{fontSize :'1.5rem'}}>Go Back</Link>
      <Stack alignItems='center'>
        <Typography variant='h2'>404</Typography>
        <Typography variant='h5'>Page Not Found</Typography>
      </Stack>
    </>
  )
}

export default NotFound
