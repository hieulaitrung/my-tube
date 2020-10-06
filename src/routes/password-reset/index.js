import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { sendResetEmail } from '../../firebase'

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


const PasswordReset = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleOnchange = (event) => {
        const { name, value } = event.currentTarget;
        if (name === 'email') {
            setEmail(value);
        }
    }

    const messageDisplay = () => {
        if (msg) {
            return (
                <div className={classes.iroot}>
                    <Alert severity={msg.type}>{msg.data}</Alert>
                </div>
            )
        }
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (email) {
            setLoading(true);
            const error = await sendResetEmail(email);
            setLoading(false);
            if (error) {
                setMsg({
                    type: 'warning',
                    data: `Error resetting password: ${error.message}.`
                });
            } else {
                setMsg({
                    type: 'success',
                    data: 'Reset link has been sent to your email.'
                });
            };
        }
        else {
            setMsg({
                type: 'warning',
                data: 'Please fill email to receive reset link.'
            });
        }
    }

    return (
        <React.Fragment>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Reset Password
            </Typography>
            {messageDisplay()}
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            autoFocus
                            value={email}
                            onChange={handleOnchange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    disabled={loading}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleOnSubmit}
                >
                    Send Reset Link
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
    )
}

export default PasswordReset
