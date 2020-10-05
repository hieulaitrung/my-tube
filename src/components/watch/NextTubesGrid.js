import React from 'react'
import NextTube from './NextTube'
import NextTubeLoader from './NextTubeLoader';
import { Grid } from '@material-ui/core';


const NextTubesGrid = (props) => {
    const tubes = props.items;
    const isNextLoaded = props.isNextLoaded;

    return (
        <Grid container spacing={1}>
            {!isNextLoaded ?
                Array.from(Array(7).keys()).map(i =>
                    (
                        <Grid item xs={12} key={i}>
                            <NextTubeLoader key={i} />
                        </Grid>
                    )
                ) :
                Object.values(tubes).map((tube) =>
                    (
                        <Grid item xs={12} key={tube.id}>
                            <NextTube item={tube} key={tube.id} />
                        </Grid>
                    )
                )
            }
        </Grid>
    )
}

export default NextTubesGrid
