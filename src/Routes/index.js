import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import Home from './Home'
import Private from './Private'

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column'
    }
}));

const Routes = () => {
    const style = useStyles()
    return (
            <Container className={style.container}>
                <Switch>
                    <Route path="/private"><Private /></Route>
                    <Route path="/"><Home /></Route>
                </Switch>
            </Container>
    )
}

export default Routes
