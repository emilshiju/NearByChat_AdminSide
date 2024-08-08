// import { LockOutlined } from "@mui/icons-material";
import CssBaseline from '@mui/material/CssBaseline'
import {
    Container,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
  } from "@mui/material";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  
  import { Formik,Form } from 'formik'
  import * as Yup from 'yup'

  import {validationSchema} from "../schema/loginSchema"
  import axios from 'axios';

  import { useSelector ,useDispatch} from 'react-redux';
 import { setUserCredential } from '../redux/authSlice';


  import { useNavigate } from 'react-router-dom';
  
  
  const AdminLogin = () => {
const dispatch=useDispatch()
    const navigate = useNavigate();
    
      
  const handleLogin =async (values, { setSubmitting, setErrors,setFieldError }) => {
   
    let email=values.email
    let password=values.password

   console.log(email)
   console.log(password)
 

   alert("skdjfsdjfiosd")
   axios.post('http://localhost:5000/adminLogin',{email,password})
   .then((response)=>{

     alert("suces")
    if(response.data.status){

 
    dispatch(setUserCredential({user:response.data.data,accestoken:response.data.AccessToken}))

    console.log("response")
    console.log(response)
 
    console.log(response)
    
      navigate('/')
  


  }

  
    if(!response.data.status){
      console.log(response.data.message)
      let message=response.data.message
      
      setErrors({password:message,email:'   ',types: 'MultipleFieldErrors'})
      

    }

   })
   .catch((error)=>{
    alert("error")

    if(error.response.status === 402){
      alert(error.response.data.message)
    }
    console.log("error")
    console.log(error)
   })
  
};
    
      return (
        <>
          <Container maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                mt: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
               
              <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                {/* <LockOutlined /> */}
              </Avatar>
              <Typography variant="h5">Login</Typography>
              <Box sx={{ mt: 1 }}>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
               {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
                <Form  >
                  
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                   
                  error={touched.email&&errors.email}
                  helperText={touched.email&&errors.email}
                />
    
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  
                  error={errors.password&&errors.password}
                  helperText={errors.password&&errors.password}
                />
              
                <Button
                
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  type='submit'
                  // onSubmit={handleLogin}
                  // disabled={isSubmitting}
                >
                  Login
                </Button>
                </Form>
                
                 )}
                </Formik>
                <div  style={{ display: 'flex', justifyContent: 'center' }}>
              
                </div>
                <br></br>
                <div className="pl-8">
                <Grid container justifyContent={"flex-center"} className="pl-4">
                  <Grid item >
                    <Link   className="pl-4" to="/register">Don't have an account?<span className="text-blue-500 pl-2">Register</span></Link>
                  </Grid>
                </Grid>
                </div>
              </Box>
            </Box>
          </Container>
          
        </>
      );
    };
  
  export default AdminLogin
  
  