import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
      width: 350,
      height: 330
  },
  media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
  },
  expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
      }),
  },
  expandOpen: {
      transform: 'rotate(180deg)',
  },
  avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
  },
}));

const UploadTubeDialog = (props) => {
    const open = props.open;
    const handleClose = props.handleClose;
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
}

export default UploadTubeDialog
