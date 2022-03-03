
// MUI
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Login } from '@mui/icons-material';
import Link from '@mui/material/Link';

// router
import { useNavigate } from 'react-router-dom';

import { setSession, Auth } from 'src/utils/jwt';
import { Button } from '@mui/material';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const navigate=useNavigate();

    const [ logOut, setLogOut ] = React.useState<Boolean>(true);

    const user =JSON.parse(localStorage.getItem('resDataUser')||'{}');

    // let isLoggedIn=false;
    // if(isValidToken(localStorage.getItem('accessToken')||'')) isLoggedIn=true;

    return (
      <React.Fragment>
        <Container maxWidth='md' sx={{textAlign:'center',backgroundColor:'#FFF3F3', padding:'10px'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Typography sx={{ minWidth: 100 }} onClick={()=>navigate('/intro')}><Button sx={{ cursor:'pointer', color:'blue' }}>Introduction</Button></Typography>
            <Typography sx={{ minWidth: 100 }} onClick={()=>navigate('/blog/posts')}><Button sx={{ cursor:'pointer', color:'blue' }}>Blog Posts</Button></Typography>
            <Tooltip title="Account settings">
                <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
            </Tooltip>
            </Box>
            <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
            
            {
                Auth() && 
                (
                    <MenuItem>
                        <Avatar /> <Typography onClick={()=>navigate('/user/profile')}>Profile</Typography>
                    </MenuItem>
                )
            }
            
            <Divider />
            
            {
                !Auth() && 
                (
                    <><MenuItem>
                        <ListItemIcon>
                            <Login fontSize="small" />
                        </ListItemIcon>
                        <Typography onClick={() => navigate('/user/login')}>Login</Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Join
                    </MenuItem>
                    </>
                )
                 
            }
            
            {
                Auth() && (
                <>
                    <MenuItem>
                    <ListItemIcon>
                    <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                    <Logout fontSize="small" />
                    </ListItemIcon>
                    <Typography onClick={
                        ()=>{
                            setLogOut(true);
                            setSession(null);
                            localStorage.setItem('resDataUser',''); // not the proper way
                            navigate('/user/login');
                        }
                    }>Logout</Typography>
                </MenuItem>
                </>
                )
            }
            
            </Menu>
        </Container>
      </React.Fragment>
    );
};

export default Navbar;