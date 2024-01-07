import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import "./styles.css";
import { useStepContext } from '@mui/material';
import { getClubsFn } from '../api/endpoints';

const pages = [
  {
  label: "Kluby",
  path: '/clubs'
  },
  {
    label: "Klienci",
    path: '/users'
  }, 
  {
    label: "Trenerzy",
    path: '/trainers'
  },
  {
    label: "Harmonogram zajęć",
    path: "/classes"
  }
];




function MenuBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [clubs, setClubs] = React.useState<{nazwa: string, id_klub: number}[]>([{nazwa: "Admin", id_klub: 0}]);
  const [chosenRole, setChodenRole] = React.useState<{nazwa: string, id_klub: number}>({nazwa: "Admin", id_klub: 0})

  const navigate = useNavigate()

  let settings = [{nazwa: "ADMIN", id_klub: 0}];

  let nonAdminPages = [
    {
      label: "Klienci",
      path: `/cusers/${chosenRole.id_klub}`
    },
    {
      label: "Trenerzy",
      path: `ctrainers/${chosenRole.id_klub}`
    }, 
    {
      label: "Harmonogram zajęć",
      path: `/cclasses/${chosenRole.id_klub}`
    }
  ];

  const fetchClubs = () => {
    fetch(getClubsFn.path).then(
      res => res.json()
    )
    .then(
      res => setClubs(res)
    )
    settings = [...settings, ...clubs]
  }
  fetchClubs()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            //href="#app-bar-with-responsive-menu"
            href="/"

            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {/* Fitness App */}
            {
              chosenRole.nazwa
            }
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {chosenRole.id_klub ==0  && pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Link to={page.path}> 
                      <Typography textAlign="center">
                      <span className='link-button'>{page.label}</span> 
                      </Typography>
                    </Link>
                </MenuItem>
              ))}

              {chosenRole.id_klub !=0  && nonAdminPages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Link to={page.path}> 
                      <Typography textAlign="center">
                      <span className='link-button'>{page.label}</span> 
                      </Typography>
                    </Link>
                </MenuItem>
              ))} 
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {chosenRole.nazwa}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {chosenRole.id_klub == 0 &&  pages.map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={page.path}> 
                  {page.label} 
                </Link>
              </Button>
            ))}

            {chosenRole.id_klub != 0 &&  nonAdminPages.map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={page.path}> 
                  {page.label} 
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
              {settings.map((club : {nazwa: string, id_klub: number}) => (
                <MenuItem key={club.id_klub} onClick= {() => {setChodenRole(club); console.log(club.id_klub); navigate("/"); handleCloseUserMenu();}}>
                  <Typography textAlign="center">{club.nazwa}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MenuBar;