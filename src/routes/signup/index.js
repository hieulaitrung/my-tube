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
import { createUserWithEmailAndPassword } from '../../firebase'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    iroot: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
}));

export default function Signup() {
    const classes = useStyles();
    let history = useHistory();

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    }

    const handleOnchange = (event) => {
        const { name, value } = event.currentTarget;
        if (name === 'firstName') {
            setfirstName(value);
        } else if (name === 'lastName') {
            setlastName(value);
        } else if (name === 'email') {
            setemail(value);
        } else if (name === 'password') {
            setpassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    }


    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (firstName && lastName && email && password && confirmPassword) {
            if (password !== confirmPassword) {
                setError('Password and confirm password does not match.');
            } else {
                createUserWithEmailAndPassword(email, password, (error) => {
                    if (error) {
                        setError('Technical error. Please try again.')
                    } else {
                        history.push("/");
                    }
                })
            }
        } else {
            setError('Please fill all details bellow.');
        }

    }

    const messageDisplay = () => {
        if (error) {
            return (
                <div className={classes.iroot}>
                    <Alert severity="warning">{error}</Alert>
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
                Sign up
            </Typography>
            {messageDisplay()}
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            value={firstName}
                            onChange={handleOnchange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                            value={lastName}
                            onChange={handleOnchange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleOnchange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
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
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnchange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I agree with all Terms and Conditions."
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleOnSubmit}
                >
                    Sign Up
          </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to="/login" variant="body2">
                            Already have an account? Sign in
              </Link>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
}