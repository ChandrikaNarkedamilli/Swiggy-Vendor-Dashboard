import React, { useEffect, useState } from 'react'
import { API_URL } from '../data/apiPath';
import {  Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [error,setError]= useState('')
  const productsHandler = async()=>{
    const firmId = localStorage.getItem('firmId')
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`)
      const newProductsData = await response.json()
      setProducts(newProductsData.products)
      console.log(newProductsData)
    } catch (error) {
      console.error("Error fetching products:", error);
      alert('Failed to fetch products')
    }
  }

  useEffect(()=>{
    productsHandler()
    console.log('This is useEffect')
  },[])


  const deleteProductById = async(productId)=>{
    const isConfirmed = confirm('Are you sure you want to delete?');
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/product/${productId}`,{
        method:'DELETE'
      })
      if(response.ok){
        console.log('Product deleted:', productId);
        setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        // const updatedProducts = products.filter(product => product._id !== productId);
        // setProducts(updatedProducts);
        alert('Product Deleted Successfuly!')
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Failed to delete the product',error)
      alert('Failed to delete product')
    }
  }

  const firmName = localStorage.getItem('firmName')

  return (
    <>
      {products.length === 0? (
        <Typography variant='h5'>No products Found</Typography>
      ):(
        <>
          <Stack alignItems='center' sx={{mt:'-50px'}}>
            <Typography variant='h4' sx={{color:'black',fontStyle:'italic'}}>{firmName}</Typography><br/>
          </Stack><br/>
          <TableContainer component={Paper} sx={{mt:'-20px'}}>
            <Table>
              <TableHead>
                <TableRow sx={{backgroundColor:'black'}}>
                  <TableCell align='center' sx={{fontWeight:'600', fontSize:'17px',color:"white"}}>Product</TableCell>
                  <TableCell align='center' sx={{fontWeight:'600', fontSize:'17px',color:"white"}}>Price</TableCell>
                  <TableCell align='center' sx={{fontWeight:'600', fontSize:'17px',color:"white"}}>Image</TableCell>
                  <TableCell align="center" sx={{fontWeight:'600', fontSize:'17px',color:"white"}}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product)=>(
                  <TableRow key={product._id} >
                    <TableCell align='center'>{product.productName}</TableCell>
                    <TableCell align='center'>{product.price}</TableCell>
                    <TableCell align='center'>
                      {product.image && (
                        <img src={`${API_URL}/uploads/${product.image}`} alt={product.productName} style={{ width: '50px', height: '50px'}} />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={()=>deleteProductById(product._id)} variant='contained' color='error'>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  )
}

export default AllProducts
