import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  Box,
  IconButton,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DarkMode from '@mui/icons-material/DarkMode';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  width: '100%',
  maxWidth: 700,
  border: '1px solid lightgray',
  height: 40,
  display: 'flex',
  alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  padding: theme.spacing(1, 2, 1, 2),
  paddingRight: `calc(1em + ${theme.spacing(4)})`, // Room for search icon
}));

export default function Header() {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left: Logo and Home */}
        <Box display="flex" alignItems="center">
          <Typography variant="h6" color="inherit" noWrap sx={{ mr: 2 }}>
            Movie Explorer
          </Typography>
          <Button color="inherit" sx={{ textTransform: 'none' }}>
            Home
          </Button>
        </Box>

        {/* Middle: Search */}
        <Search>
          <StyledInputBase placeholder="Search movies..." />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Search>

        {/* Right: Dark Mode + Login */}
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton>
            <DarkMode />
          </IconButton>
          <Button variant="outlined" sx={{ textTransform: 'none' }}>
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
