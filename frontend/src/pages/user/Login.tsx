import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// @mui
import { Container, Typography, TextField, Button } from '@mui/material';
// components
import Page from '../../components/Page';
import { setSession } from '../../utils/jwt';
import axiosLogin  from '../../utils/axios';

// ----------------------------------------------------------------------

export default function LandingPage() {
  const [ email, setEmail ] = useState<string>(''); 
  const [ password, setPwd ]= useState<string>('');

  // For debuggin
  // try{
  //   const user =JSON.parse(localStorage.getItem('resDataUser')||'{}');
  //   console.log(user);
  // } catch(e) {
  //   console.log("Error:"+e);
  // }
  
  const navigate=useNavigate();

  async function onSubmit(){
    // email, password
    // post request LOGIN
    axiosLogin.post('auth/login', { 
        email: email,
        password:password})
      .then(res =>{
          //console.log(res.data);
          localStorage.setItem('resDataUser',JSON.stringify(res.data.user)); // may not be the perfect way
          setSession(res.data.token.accessToken);
          navigate('/blog/posts'); // move to posts if successful
      }).catch(()=>{
        alert('Login failed!');
      });
  };

  return (
    <Page title="Login Page">
      <Container maxWidth='sm'>
          <Typography variant="h3" component="h1" paragraph>
            Login Page
          </Typography>
          <Typography>
          <TextField id="email" onChange={(e) =>setEmail(e.target.value)} value={email} name="email" label="Email" variant="standard" />
          </Typography>
          <Typography>
            <TextField id="password" name="password" onChange={(e)=>setPwd(e.target.value)} value={password} label="Password" variant="standard" type='password'/>
          </Typography>
          <Typography>
            <Button onClick={onSubmit} variant="contained" type='submit'>Submit</Button>
          </Typography>
      </Container>
    </Page>
  );
}
