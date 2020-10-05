import React, { useState, useEffect } from 'react'
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import IconLoaderButton from './IconLoaderButton';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.5),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  miniSearch: {
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  }
}));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Searchbar = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const classes = useStyles();
  const query = useQuery().get("query") || '';
  const [searchTerm, setSearchTerm] = useState('');
  const expandSearch = props.expandSearch;
  const handleSubmitSearch = props.handleSubmitSearch;
  const handleExpandSearch = props.handleExpandSearch;
  const userLoading = props.userLoading;

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSubmit = (event, term) => {
    if (event.key === 'Enter') {
      handleSubmitSearch(term);
    }
  }

  return (
    <React.Fragment>
      {(expandSearch) &&
        <IconButton aria-label="search" onClick={() => { handleExpandSearch(false) }}>
          <ArrowBackIcon />
        </IconButton>
      }
      {(!matches || expandSearch) &&
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={(event) => handleSubmit(event, searchTerm)}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      }
      {matches && !expandSearch &&
        <div color="textSecondary" className={classes.miniSearch}>
          {userLoading ? <IconLoaderButton /> :
            <IconButton aria-label="search" onClick={() => { handleExpandSearch(true) }}>
              <SearchIcon />
            </IconButton>
          }
        </div>
      }
    </React.Fragment>
  )
}

export default Searchbar
