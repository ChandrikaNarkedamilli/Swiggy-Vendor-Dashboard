import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [image, setImage] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handlerRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event) =>{
    const selectedImage = event.target.files[0]
    setImage(selectedImage)
  }

  const addFirmHandler = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.error("user authentication failed");
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append('image', image)


      category.forEach((value) => {
        formData.append("category", value);
      });
      region.forEach((value) => {
        formData.append("region", value);
      });

      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers :{
          'token': `${loginToken}`
        },
        body : formData,
      })

      const data = await response.json()
      if(response.ok){
        console.log(data)
        setFirmName('')
        setArea('')
        setOffer('')
        setCategory([])
        setRegion([])
        setImage(null)
        alert('Firm Added Successfully')
        console.log('this is firmId ', data.firmId)
        
      }else if(data.message === 'Vendor can have only one Firm'){
        alert('Firm already exists 🍽 (only 1 firm can be added per vendor)');
      }
      else {
        console.error("Server error: ", data);
        alert(`Failed to add firm: ${data.error || "Unknown error"}`);
      }

      const firmId = data.firmId
        localStorage.setItem('firmId', firmId)

    } catch (error) {
      console.error('Failed to add Firm',error)
      alert("Failed to add firm. Please try again."); 
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            mt: "-30px",
            width: "550px",
            padding:'10px 20px 10px 20px',borderRadius:'30px',border:'1px solid lightgray'
          }}
        >
          <Typography variant="h4" sx={{ color: "#fc8019", fontWeight: 500 }}>
            Welcome To Swiggy..!
            <br />
            Add your Firm
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={addFirmHandler}>
            <TextField
              autoFocus
              fullWidth
              required
              margin="normal"
              name="firmname"
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              label="Firm Name"
              autoComplete="Firm Name"
            />
            <TextField
              fullWidth
              required
              margin="normal"
              name="area"
              label="Area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              autoComplete="Area"
            />

            <Stack direction="row" spacing={4} alignItems="center">
              <Typography sx={{ fontSize: "17px" }}>Category :</Typography>
              <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Veg"
                  value='veg'
                  checked={category.includes("veg")}
                  onChange={handleCategoryChange}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Non-Veg"
                  value='non-veg'
                  checked={category.includes("non-veg")}
                  onChange={handleCategoryChange}
                />
              </FormGroup>
            </Stack>

            <Stack direction="row" spacing={3} alignItems="center">
              <Typography sx={{ fontSize: "17px" }}>Region:</Typography>
              <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                <Stack>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="South-Indian"
                    value='south-indian'
                    checked={region.includes("south-indian")}
                    onChange={handlerRegionChange}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="North-Indian"
                    value='north-indian'
                    checked={region.includes("north-indian")}
                    onChange={handlerRegionChange}
                  />
                </Stack>
                <Stack>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Chinese"
                    value='chinese'
                    checked={region.includes("chinese")}
                    onChange={handlerRegionChange}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Bakery"
                    value='bakery'
                    checked={region.includes("bakery")}
                    onChange={handlerRegionChange}
                  />
                </Stack>
                <Stack>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Italian"
                    value='italian'
                    checked={region.includes("italian")}
                    onChange={handlerRegionChange}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Arabian"
                    value='arabian'
                    checked={region.includes("arabian")}
                    onChange={handlerRegionChange}
                  />
                </Stack>
              </FormGroup>
            </Stack>

            <TextField
              fullWidth
              margin="normal"
              name="offer"
              label="Offer"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
            />
            <TextField
              fullWidth
              name="image"
              type="file"
              accept="image/*"
              display="none"
              onChange={handleImageUpload}
            />
            <Box sx={{ textAlign: 'center'}}>
              <Button
                variant="contained"
                type="submit"        
                fullWidth  
                sx={{ mt: 3, mb: 2, height: "40px", backgroundColor: "#fc8019", width:'180px'}}
              >
                Add Firm
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AddFirm;
