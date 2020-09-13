import React from 'react'
import NextTube from './NextTube'


const NextTubeList = (props) => {
    const tubes = props.items;

    return (
        <React.Fragment>
            {Object.values(tubes).map((tube) => 
                <NextTube item={tube}  key={tube.id} / >
            )}
        </React.Fragment>
    )
}

export default NextTubeList
