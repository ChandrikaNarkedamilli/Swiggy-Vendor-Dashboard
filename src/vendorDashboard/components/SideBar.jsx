import { AppBar, Box, Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material'
import React from 'react'

const SideBar = ({showFirmHandler, showProductHandler, showAllProductsHandler}) => {
  return (
    <>
    {/* <Box sx={{ display: 'flex', flexDirection: 'column', width: '240px', flexShrink: 0 }}>
      <AppBar position='fixed' sx={{top:'65px',left:0,width:'240px',height:'100vh',backgroundColor:'#fc8019'}}>
        <Toolbar sx={{ flexDirection: 'column', alignItems: 'flex-start', height: '100%', padding: '20px' }}>
          <List>
            <ListItem button onClick={showFirmHandler}>
              <ListItemText primary="Add Firm" sx={{paddingBottom:'20px'}}/>
            </ListItem>
            <ListItem button onClick={showProductHandler}>
              <ListItemText primary="Add Product" sx={{paddingBottom:'20px'}}/>
            </ListItem>
            <ListItem button>
              <ListItemText primary="All Products " sx={{paddingBottom:'20px'}}/>
            </ListItem>
            <ListItem button>
              <ListItemText primary="User Details" sx={{paddingBottom:'20px'}}/>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    </Box> */}
    

    <Drawer
      variant="permanent"
      
      sx={{
        width: '230px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '230px',
          boxSizing: 'border-box',
          top: '65px',
          backgroundColor:'#fc8019'
        },
      }}
    >
      <Toolbar sx={{ flexDirection: 'column', alignItems: 'flex-start', height: '100%', padding: '20px' }}>
          <List>
            <ListItem button onClick={showFirmHandler}>
              <ListItemText primary="Add Firm" sx={{paddingBottom:'20px',color:'white'}}/>
            </ListItem>
            <ListItem button onClick={showProductHandler}>
              <ListItemText primary="Add Product" sx={{paddingBottom:'20px',color:'white'}}/>
            </ListItem>
            <ListItem button onClick={showAllProductsHandler}>
              <ListItemText primary="All Products " sx={{paddingBottom:'20px', color:'white'}}/>
            </ListItem>
            <ListItem button>
              <ListItemText primary="User Details" sx={{paddingBottom:'20px',color:'white'}}/>
            </ListItem>
          </List>
        </Toolbar>
    </Drawer>
    </>
  )
}

export default SideBar
