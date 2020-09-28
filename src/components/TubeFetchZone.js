import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ytdl from 'ytdl-core'
import api from '../apis'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    form: {
        display: 'flex'
    },
    textfield: {
        flexGrow: 1,
        marginRight: theme.spacing(1)
    },
    wrapper: {
        position: 'relative',
        display: 'inline-flex'
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    fetchInfo: {
        display: 'flex',
        marginTop: theme.spacing(2)
    }
}));

const TubeFetchZone = (props) => {
    const classes = useStyles();
    const [link, setLink] = useState('');
    const loading = props.loading;
    const handleUpload = props.handleUpload;

    const handleChange = (event) => {
        setLink(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleUpload(link);
    }

    // const getThumbnail = () => {
    //     try {
    //         return info.thumbnails.filter(t => t.width === 246)[0];
    //     } catch (e) {
    //         console.error(`Failed to get thumbnail for ${info.id}`, e);
    //         return { url: 'https://via.placeholder.com/246' }
    //     }

    // }


    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit} noValidate autoComplete="off">

                <TextField className={classes.textfield} required value={link} onChange={handleChange} id="outlined-basic" label="Enter link" variant="outlined" />
                <div className={classes.wrapper}>
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        Fetch
                </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </form>
        </div>
    )
}

export default TubeFetchZone
