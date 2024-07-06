import React from 'react'
import  { AppBar,Button,IconButton,Stack,Toolbar, Typography } from '@mui/material'
import swiggylogowhite from '../images/swiggylogo.png'

const NavBar = ({showLoginHandler,showRegisterHandler, showLogout,logoutHandler}) => {

  // const firmName = localStorage.getItem('firmName')

  return (
    <>
      <AppBar position='sticky' style={{backgroundColor :'white '}} >
        <Toolbar style={{paddingLeft:'60px',paddingRight:'60px'}}>
            <IconButton size='small' edge='start' style={{ width: 50, height: 50 ,marginRight:'5px'}}>
              <img src={swiggylogowhite} alt='SwiggyPartner' style={{ width: '100%', height: '100%' }} />
            </IconButton>
            <Typography variant='h5' sx={{color:'black',flexGrow:1}}>Swiggy for Restaurants</Typography>
            {/* <Typography variant='h5' sx={{color:'black',flexGrow:1,paddingRight:'30px'}}>{firmName}</Typography> */}
          <Stack direction='row' alignItems='center' spacing={2}>
            {!showLogout ? (
              <>
                <Button sx={{color:'black'}} onClick={showLoginHandler}>Login</Button>
                <Button sx={{color:'black'}} onClick={showRegisterHandler}>Register</Button>
              </>
            ):(
              <Button sx={{color:'black'}} onClick={logoutHandler} >Logout</Button>
            )}
            
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default NavBar
