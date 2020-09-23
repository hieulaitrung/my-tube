import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import uploadImg from '../images/outbox.svg'
import Dropzone from 'react-dropzone'

const useStyles = makeStyles((theme) => ({
  dropzoneContainer: {
    marginBottom: theme.spacing(2)

  },
  dropzonePicker: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  dropzoneImg: {
    width: 75,
    marginBottom: theme.spacing(2),
    opacity: 0.6
  },
  dropzoneButton: {
  
  },
  dropzoneTC: {
    textAlign: 'center'
  },
  wrapper: {
    margin: theme.spacing(2),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}));

const TubeDropzone = (props) => {
  const classes = useStyles();
  const loading = props.loading;
  const maxSize = 10485760; //10MB

  const handleUpload = props.handleUpload;

  return (
    <Dropzone noClick={true} noKeyboard={true}
      minSize={0} maxSize={maxSize}
      accept="video/*"
      disabled={loading}
      multiple={false}
      onDrop={handleUpload}>
      {({ getRootProps, getInputProps, open, isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
        const isFileTooLarge = rejectedFiles != null && rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
        return (
          <section className={classes.dropzoneContainer}>
            <div {...getRootProps()} className={classes.dropzonePicker}>
              <input {...getInputProps()} />
              <img className={classes.dropzoneImg} src={uploadImg} alt="Upload" />
              <Typography variant="subtitle1">Drag & drop videos to upload</Typography>
              {isDragReject && <Typography color="error" className={classes.dropzoneDesc} variant="subtitle2">File type not accepted, sorry!</Typography>}
              {isFileTooLarge && <Typography color="error" className={classes.dropzoneDesc} variant="subtitle2">File type not accepted, sorry!</Typography>}
              <div className={classes.wrapper}>
                <Button onClick={open} disabled={loading} className={classes.dropzoneButton} variant="contained" color="primary">
                  Select file
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>

            </div>
            <Typography className={classes.dropzoneTC} variant="body2">By uploading videos, you confirmed to agree with all MyTube Terms & Conditions</Typography>
          </section>
        )
      }}
    </Dropzone>
  )
}

export default TubeDropzone
