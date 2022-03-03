import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
    return(
        <Container maxWidth='sm' sx={{padding:'20px',textAlign:'center',color:'grey'}}>
            <Box>
                <Typography>
                    Copyleft all rights shared by LaLa Sam
                </Typography>
            </Box>
        </Container>
    );
}

export default Footer;