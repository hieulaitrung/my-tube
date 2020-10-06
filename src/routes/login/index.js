import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { signIn, signInWithGoogle, sendEmailVerification } from '../../firebase'


const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  iroot: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
    '& a': {
      'text-decoration': 'underline'
    }
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  let history = useHistory();

  const handleOnchange = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    
    if (email && password) {
      setLoading(true);
      const error = await signIn(email, password);
      setLoading(false);
      if (error) {
        setError(error);
      } else {
        history.push("/");
      }
    } else {
      setError({code: 'invalid', message: 'Email or password is missing.'});
    }
  }

  const resend = async (event, user) => {
    event.preventDefault();
    const error = await sendEmailVerification(user); 
    setError(error);
  };

  const messageDisplay = () => {
    if (error) {
      const resendVerifiedEmail = error.code === 'unverified' ?
        <Link href="#" onClick={(event)=> resend(event, error.user)} color="inherit">Resend email</Link> :
        '';
      return (
        <div className={classes.iroot}>
          <Alert severity="warning">
            {error.message} {resendVerifiedEmail}
          </Alert>
        </div>
      )
    }
  }

  return (
    <React.Fragment>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
        </Typography>
      {messageDisplay()}
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={handleOnchange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={handleOnchange}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          disabled={loading}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleOnSubmit}
        >
          Sign In
          </Button>
        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} to="/password-reset" variant="body2">
              Forgot password?
              </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default Login 