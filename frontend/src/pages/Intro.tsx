// @mui
import { Container, Typography, Link } from '@mui/material';
// components
import Page from '../components/Page';
import { useNavigate } from 'react-router';
// ----------------------------------------------------------------------



export default function LandingPage() {
  const navigate=useNavigate();

  return (
    <Page title="Landing Page">
      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Welcome to Sam's BetterDay Magic Initials
        </Typography>
        <Typography gutterBottom sx={{fontSize:'200%', color:'olive'}}>
         An Idle Brain is the devil's workshop
        </Typography>
        <Typography>
          Proverbs contain both Culture and Wisdom.
          Would you like to try it with Magic Initials App?    <Link><a target='_blank' href='https://magicinitials.com/init/#s20'>Click</a></Link>
        </Typography>
      </Container>
    </Page>
  );
}
