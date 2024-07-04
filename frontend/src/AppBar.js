// frontend/src/AppBar.js
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function MyAppBar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1,  textDecoration: 'none', color: 'inherit'  }}>
                    FuseAI
                </Typography>
                <Button color="inherit" onClick={handleMenuClick}>  
                    Dashboard
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}

                >   <MenuItem component={Link} to="/dashboard/home" onClick={handleMenuClose}>Home</MenuItem>
                    <MenuItem component={Link} to="/dashboard/ai-tools" onClick={handleMenuClose}>AI Tools</MenuItem>
                    <MenuItem component={Link} to="/dashboard/favorite-tools" onClick={handleMenuClose}>Favorite Tools</MenuItem>
                    <MenuItem component={Link} to="/dashboard/recently-used" onClick={handleMenuClose}>Recently used</MenuItem>

                    {/* Add more MenuItems as needed */}
                </Menu>
                <Button color="inherit" component={Link} to="/about">
                    About Us
                </Button>
                <Button color="inherit" component={Link} to="/login">
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default MyAppBar;
