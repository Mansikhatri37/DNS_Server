import React from 'react';
import { Box, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Header({ darkMode, setDarkMode }) {
  // Toggle theme handler
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Box textAlign="right">
      <IconButton onClick={toggleTheme} color="inherit">
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

export default Header;
