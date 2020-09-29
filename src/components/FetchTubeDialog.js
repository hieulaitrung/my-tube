import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';
import { auth } from '../firebase'
import api from '../apis';
import TubeFetchZone from './TubeFetchZone';
import UploadStepper from './UploadStepper';

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    content: {
        width: 500,

    }
}));

const FetchTubeDialog = (props) => {
    const classes = useStyles();
    const [tube, setTube] = useState({});
    const [loading, setLoading] = useState(false);
    const openDialog = props.open;
    const handleCloseDialog = props.handleClose;

    const handleUpload = async (link) => {
        setLoading(true);
        const info = await api.getVideoInfo(link);
        const newTube = {
            ...tube,
            fileSource: 'youtube',
            fileName: info.id,
            fileAuthor: info.author.name,
            title: info.title,
            body: info.body,
            thumbnails: info.thumbnails
        };
        setLoading(false);
        setTube(newTube);
    }

    const handleCreateTube = async (t) => {
        setLoading(true);
        const token = await auth.currentUser.getIdToken();
        const { fileId } = await api.fetchVideo(tube.fileName, token);
        const newTube = {
            ...t,
            fileId: fileId
        }
        const result = await api.createTube(newTube, token);
        setLoading(false);
        if (result.error) {
            toast.error(result.error);
        } else {
            handleClose();
            toast.success('Tube has been saved.');
        }
    }

    const handleClose = () => {
        setTube({});
        setLoading(false);
        handleCloseDialog();
    }

    return (
        <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle disableTypography >
                <Typography variant="h6">Fetch video from Youtube</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content} dividers>
                {!tube.fileName && <TubeFetchZone loading={loading} handleUpload={handleUpload} />}
                {tube.fileName && <UploadStepper loading={loading} tube={tube} setTube={setTube} handleCreateTube={handleCreateTube} />}

            </DialogContent>
        </Dialog>
    )
}

export default FetchTubeDialog
