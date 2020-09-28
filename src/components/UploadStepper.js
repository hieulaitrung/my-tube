import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    wrapper: {
        position: "relative",
        display: "flex",
        flexDirection: "column"
    },
    fab: {
       marginLeft: "auto",
       display: "flex",
    },
}));

const getSteps = () => {
    return ['Fill details', 'Select view mode'];
}

const getStepContent = (stepIndex, tube, handleOnchange) => {
    switch (stepIndex) {
        case 0:
            return (
                <React.Fragment>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoFocus
                        value={tube.title}
                        onChange={handleOnchange} />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={3}
                        id="body"
                        label="Body"
                        name="body"
                        value={tube.body}
                        onChange={handleOnchange} />
                </React.Fragment>
            );
        case 1:
            return (
                <React.Fragment>
                    <Typography variant="subtitle1">View mode</Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Private video"
                    />

                </React.Fragment>
            );
        default:
            return 'Unknown stepIndex';
    }
}

const UploadStepper = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const loading = props.loading;
    const tube = props.tube;
    const setTube = props.setTube;
    const handleCreateTube = props.handleCreateTube;

    const steps = getSteps();

    const handleNext = () => {

        if (activeStep === steps.length - 1) {
            handleCreateTube(tube);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleOnchange = (event) => {
        const { name, value } = event.currentTarget;
        let newTube = { ...tube };
        newTube[name] = value;
        setTube(newTube);
    }


    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <div className={classes.wrapper}>
                    {getStepContent(activeStep, tube, handleOnchange)}
                    <div className={classes.fab}>
                        {loading && <CircularProgress className={classes.buttonProgress} />}
                        <Button
                            disabled={activeStep === 0 || loading}
                            onClick={handleBack}
                            className={classes.backButton}>
                            Back
                        </Button>

                        <Button disabled={loading} variant="contained" color="primary" onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadStepper
