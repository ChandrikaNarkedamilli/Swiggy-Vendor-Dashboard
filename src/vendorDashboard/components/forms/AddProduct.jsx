import React, { useState } from 'react'
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Input, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import { API_URL } from '../../data/apiPath'

const AddProduct = () => {
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState([])
  const [image, setImage] = useState(null)
  const [bestseller, setBestseller] = useState(false)
  const [description, setDescription] = useState('')

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestsellerChange = (event)=>{
    const value = event.target.value === 'true'
    setBestseller(value)
  }

  const handleImageUpload = (event) =>{
    const selectedImage = event.target.files[0]
    setImage(selectedImage)
  }

  const addProductHandler = async(e)=>{
    e.preventDefault()
    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem('firmId')

      // console.log('firmId:', firmId);
      if(!loginToken || !firmId){
        console.error('user not authenticated')
      }

      const formData = new FormData()
      formData.append('productName',productName)
      formData.append('price',price)
      formData.append('description',description)
      formData.append('bestseller', bestseller)
      formData.append('image', image)

      category.forEach((value)=>{
        formData.append('category',value)
      })

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:'POST',
        body : formData
      })

      const data = await response.json()
      if(response.ok){
        alert('Product added successfully')
        setProductName('')
        setPrice('')
        setDescription('')
        setCategory([])
        setBestseller(false)
        setImage(null)
      }
    } catch (error) {
      console.error(error)
      alert('failed to add product')
    }
  }

  const firmName = localStorage.getItem('firmName')

  return (
    <>
      <Box sx={{mt:'-50px'}}>
        <Typography variant='h5' sx={{color:'black',fontStyle:'italic'}}> Hi {firmName}, Add products to continue..</Typography><br/><br/>
      </Box>
      <Container component='main' maxWidth='xs'>
        <Box sx={{display:'flex', alignItems:'center',flexDirection:'column',mt:'-30px',width:'540px',padding:'10px 20px 10px 20px',borderRadius:'30px',border:'1px solid lightgray'}}>
          <Typography variant='h4' sx={{color:'#fc8019', fontWeight:700}}>Add Products</Typography>
          <Box component='form' noValidate sx={{mt:1}} onSubmit={addProductHandler}>
            <TextField autoFocus fullWidth required margin='normal' value={productName} onChange={(e)=> setProductName(e.target.value)} name='productname' label='Product Name' autoComplete='Product Name'/>
            <TextField fullWidth required margin='normal' value={price} onChange={(e)=> setPrice(e.target.value)} name='price' label='Price' />
            <FormControl  component='fieldset' sx={{ marginTop: 2 }}>
              <FormLabel component ='legend'>Category:</FormLabel>
              <FormGroup sx={{display:'flex',flexDirection:'row'}}>
                <FormControlLabel control={<Checkbox />} label='Veg' value='veg' checked={category.includes("veg")} onChange={handleCategoryChange} />
                <FormControlLabel control={<Checkbox />} label='Non-Veg' value='non-veg' checked={category.includes("non-veg")} onChange={handleCategoryChange} />
              </FormGroup>
            </FormControl>
            <TextField fullWidth name='image' type='file' accept='image/*' display='none' onChange={handleImageUpload}/>
            <FormControl component='fieldset' sx={{ marginTop: 2 }}>
              <FormLabel component ='legend'>Bestseller:</FormLabel>
              <RadioGroup name='bestseller'>
                <Stack direction='row' spacing={4}>
                  <FormControlLabel control={<Radio />} label='Yes' value='true' checked={bestseller === true} onChange={handleBestsellerChange} />
                  <FormControlLabel control={<Radio />} label='No'  value='false' checked={bestseller === false} onChange={handleBestsellerChange} />
                </Stack>
              </RadioGroup>
            </FormControl>
            <TextField fullWidth  margin='normal' name='description' label='Description' value={description} onChange={(e)=> setDescription(e.target.value)}/>
            <Box sx={{ textAlign: 'center'}}> 
              <Button variant='contained' type='submit' fullWidth sx={{ mt: 3, mb: 2 ,height:'40px',backgroundColor:'#fc8019', width:'180px'}}>Add Product</Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default AddProduct
