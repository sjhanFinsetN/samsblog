import { Helmet } from 'react-helmet-async';
import { forwardRef, ReactNode } from 'react';
// @mui
import { Box, BoxProps, Container } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Helmet>
      <title>{`${title} | Finset N`}</title>
      {meta}
    </Helmet>
    <Container maxWidth='md' sx={{backgroundColor:'#F5F5FF',padding:'10px'}}> 
    <Box ref={ref} {...other} maxWidth='md'>
      {children}
    </Box>
    </Container>
  </>
));

export default Page;
