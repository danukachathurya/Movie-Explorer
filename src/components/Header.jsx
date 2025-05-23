import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  Box,
  IconButton,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useTheme } from "../components/ThemeProvider";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import FavoriteIcon from '@mui/icons-material/Favorite';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  width: "100%",
  maxWidth: 700,
  border: "1px solid lightgray",
  height: 40,
  display: "flex",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  padding: theme.spacing(1, 2, 1, 2),
  paddingRight: `calc(1em + ${theme.spacing(4)})`,
}));

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  if (location.pathname === "/sign-in") return null;

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            noWrap
            sx={{ mr: 2, textDecoration: "none", color: "inherit" }}
            component={Link}
            to="/"
          >
            Movie Explorer
          </Typography>
          <Button
            color="inherit"
            sx={{ textTransform: "none" }}
            component={Link}
            to="/"
          >
            Home
          </Button>
        </Box>

        <Search>
          <StyledInputBase
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Search>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton component={Link} to="/favorites" color="inherit">
            <FavoriteIcon />
          </IconButton>
          <IconButton onClick={toggleTheme} color="inherit">
            {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button component={Link} to="/sign-in" variant="outlined" sx={{ textTransform: "none" }}>
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
