import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { InputBase, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.06),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.08) },
  marginLeft: 0,
  width: '100%',
  border: `1px solid ${theme.palette.divider}`,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.1, 1, 1.1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const SearchBar = ({ placeholder = 'Search tasks, users, reports...' }) => {
  return (
    <Box sx={{ width: { xs: '100%', md: 360 } }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon fontSize="small" />
        </SearchIconWrapper>
        <StyledInputBase placeholder={placeholder} inputProps={{ 'aria-label': 'search' }} />
      </Search>
    </Box>
  );
};

export default SearchBar;
