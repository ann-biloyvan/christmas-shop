import React, { useContext, useEffect, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
  CssBaseline,
  Modal,
  Paper,
  ThemeProvider,
  AppBar,
  Toolbar,
  Typography,
  Link,
  Badge,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemText,
  InputBase,
  ClickAwayListener,
} from '@mui/material';
import { responsiveFontSizes, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import Cookies from 'js-cookie';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import classes from '../utils/classes';
import { getError } from '../utils/error';
import styles from '../utils/LightRope.module.css';
import { Store } from '../utils/Store';
import LightRope from './LightRope';

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo, lightsMode } = state;

  let theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },

      MuiCssBaseline: {
        styleOverrides: {
          body: {
            textUnderlinePosition: 'under',
            overflow: 'overlay',
            scrollbarColor: '#6b6b6b #2b2b2b',
            scrollbarWidth: 'thin',

            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              width: '5px ',
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: '#6b6b6b',
            },
            '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
              {
                backgroundColor: '#959595',
              },
            '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
              {
                backgroundColor: '#959595',
              },
            '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
              {
                backgroundColor: '#959595',
              },
            '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
              backgroundColor: '#2b2b2b',
            },
          },
        },
      },
    },

    typography: {
      fontFamily: "'Dancing Script'",
      fontSize: 18,
    },

    palette: {
      mode: 'dark',
      primary: {
        main: 'rgb(172, 54, 54)',
      },
      secondary: {
        main: '#208080',
      },
    },
  });

  theme = responsiveFontSizes(theme);

  const router = useRouter();

  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const [query, setQuery] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
    setClick(false);
  };

  useEffect(() => {
    fetchCategories();
    if (localStorage.getItem('lightsMode') === null) {
      dispatch({
        type: 'BASIC_MODE',
      });
    }
  }, []);

  const lightsChangeHandler = () => {
    dispatch({
      type: lightsMode ? 'COLOR_MODE' : 'BASIC_MODE',
    });
    const newMode = !lightsMode;
    localStorage.setItem('lightsMode', newMode ? true : false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect !== 'backdropClick' && redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    Cookies.remove('shippinhAddress');
    Cookies.remove('paymentMethod');
    router.push('/');
  };

  const [click, setClick] = useState(false);

  const handleClickAway = () => setClick(false);

  const isDesktop = useMediaQuery('(min-width:600px)');
  return (
    <>
      <Head>
        <title>{title ? `${title} - KaYa` : 'KaYa'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar sx={classes.appbar}>
          <LightRope />
          <Toolbar sx={classes.toolbar}>
            <Box
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
            >
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sidebarOpenHandler}
                sx={classes.menuButton}
              >
                <MenuIcon sx={classes.navbarButton} />
              </IconButton>
              <NextLink href="/" passHref>
                <Link>
                  <Box>
                    <Typography variant="h1" style={classes.brand}>
                      K
                    </Typography>
                    <Typography variant="h1" style={classes.brand}>
                      a
                    </Typography>
                    <Typography variant="h1" style={classes.brand2}>
                      Y
                    </Typography>
                    <Typography variant="h1" style={classes.brand}>
                      a
                    </Typography>
                  </Box>
                </Link>
              </NextLink>
            </Box>
            <Drawer
              anchor="left"
              open={sidbarVisible}
              onClose={sidebarCloseHandler}
            >
              <Paper sx={classes.paper}>
                <List>
                  <ListItem>
                    <Box sx={classes.flex}>
                      <Typography>Shopping by category</Typography>
                      <IconButton
                        aria-label="close"
                        onClick={sidebarCloseHandler}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                  <Divider light />
                  <NextLink href={'/search?category=all'} passHref>
                    <ListItem
                      button
                      component="a"
                      onClick={sidebarCloseHandler}
                    >
                      <ListItemText primary="All"></ListItemText>
                    </ListItem>
                  </NextLink>
                  {categories.map((category) => (
                    <NextLink
                      key={category}
                      href={`/search?category=${category}`}
                      passHref
                    >
                      <ListItem
                        button
                        component="a"
                        onClick={sidebarCloseHandler}
                      >
                        <ListItemText primary={category}></ListItemText>
                      </ListItem>
                    </NextLink>
                  ))}
                </List>
              </Paper>
            </Drawer>

            <Box component="div" sx={classes.flex}>
              {!click && (
                <IconButton
                  onClick={() => setClick(true)}
                  sx={{ padding: 0.5 }}
                >
                  <SearchIcon
                    sx={{ transform: 'rotate(-15deg) scaleX(-1)' }}
                  ></SearchIcon>
                </IconButton>
              )}
              {click && isDesktop ? (
                <ClickAwayListener onClickAway={handleClickAway}>
                  <form onSubmit={submitHandler}>
                    <Box sx={classes.searchForm}>
                      <InputBase
                        autoFocus
                        name="query"
                        sx={classes.searchInput}
                        placeholder="Search products"
                        onChange={queryChangeHandler}
                      />
                      <Button
                        variant="contained"
                        type="submit"
                        aria-label="search"
                        sx={classes.searchButton}
                      >
                        <SearchIcon />
                      </Button>
                    </Box>
                  </form>
                </ClickAwayListener>
              ) : (
                <Modal open={click} onClose={() => setClick(false)}>
                  <Box sx={classes.modal}>
                    <form onSubmit={submitHandler}>
                      <Box sx={classes.searchForm}>
                        <InputBase
                          name="query"
                          sx={classes.searchInput}
                          placeholder="Search products"
                          onChange={queryChangeHandler}
                        ></InputBase>
                        <Button
                          variant="contained"
                          type="submit"
                          aria-label="search"
                          sx={classes.searchButton}
                        >
                          <SearchIcon />
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Modal>
              )}

              <NextLink href="/cart" passHref>
                <IconButton sx={{ padding: 0.5 }}>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
                    </Badge>
                  ) : (
                    <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
                  )}
                </IconButton>
              </NextLink>

              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    sx={classes.navbarButton}
                  >
                    <Typography variant="h5"> {userInfo.name} </Typography>
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/order-history')
                      }
                    >
                      Order Hisotry
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, '/admin/dashboard')
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Button sx={classes.navbarButton}>
                    <Typography variant="h5">Login</Typography>
                  </Button>
                </NextLink>
              )}

              <Box className={styles.controler}>
                <button
                  className={styles.button}
                  onClick={lightsChangeHandler}
                ></button>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={classes.main}>
          {children}
        </Box>
        <Box component="footer" sx={classes.footer}>
          <Typography>All rights reserved. LLC KaYa.</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
