// @mui
import { Container, Typography, Box } from '@mui/material';
import { red } from '@mui/material/colors';
import { Auth } from 'src/utils/jwt';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function UserProfilePage() {
  
  const user =JSON.parse(localStorage.getItem('resDataUser')||'{}');
  // console.log(user);
  if(Auth()) {
    return (
      <Page title="User Profile Page">
        <Box>
          <Container>
            <Typography variant="h3" component="h1" paragraph>
              User Profile Page
            </Typography>
            <Typography gutterBottom>
              Your name is {user.username}
            </Typography>
            <Typography gutterBottom>
              Your Email is {user.email}
            </Typography>
          </Container>
        </Box>
      </Page>
    );
  } else {
    return (
      <Page title="User Profile Page">
        <Container maxWidth='xs'>
          <Typography gutterBottom sx={{color:'red'}}>
            Please login first!
          </Typography>
        </Container>
      </Page>
    );
  }

  
}
