import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';
import TubeDropzone from './TubeDropzone'
import UploadStepper from './UploadStepper'
import { uploadFile, auth } from '../firebase'
import { MyTubeAPI } from '../apis'
import firebase from "firebase/app";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  content: {
    width: 400,
    minHeight: 400
  }
}));

const UploadTubeDialog = (props) => {
  const classes = useStyles();
  const [tube, setTube] =  useState({});
  const [loading, setLoading] = useState(false);
  const openDialog = props.open;
  const handleCloseDialog = props.handleClose;
  const api = MyTubeAPI();


  const handleUpload = (acceptedFiles) => {
    if (!acceptedFiles.length)
      return;
    const uploadTask = uploadFile(acceptedFiles[0], auth.currentUser.uid);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.RUNNING: // or 'running'
            setLoading(true);
            break;
          default:
            setLoading(false);
            toast.error('Upload is not running');
            break;
        }
      }, function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        setLoading(false);
        toast.error(`Technical error: ${error.message}`);
      }, function () {
        setLoading(false);
        const newTube = {...tube};
        newTube.fileName = uploadTask.snapshot.metadata.customMetadata.originName;
        newTube.fileId = uploadTask.snapshot.ref.name;
        setTube(newTube);
      });
  }

  const handleCreateTube = async (tube) => {
    const token = await auth.currentUser.getIdToken();
    const result = await api.createTube(tube, token);
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
        <Typography variant="h6">Upload video</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content} dividers>
        {!tube.fileId && <TubeDropzone loading={loading} handleUpload={handleUpload} />}
        {tube.fileId && <UploadStepper tube={tube} setTube={setTube} handleCreateTube={handleCreateTube} />}

      </DialogContent>
    </Dialog>
  )
}

export default UploadTubeDialog
