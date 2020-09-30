import React, { useMemo } from 'react'
import { CardMedia, makeStyles } from '@material-ui/core';

const TubeThumbnail = (props) => {
    const className = props.className;
    const tube = props.tube;
    const width = props.width;

    const thumbnail = useMemo(
        () => {
            try {
                return tube.thumbnails.filter(t => t.width === width)[0].url;
            } catch (e) {
                return `https://via.placeholder.com/${width}`
            }
            // Do expensive calculation and return.
        },
        [tube, width]
    )


    return (
        <CardMedia
            className={className}
            image={thumbnail}
            title={tube.title}
        />
    )
}

export default TubeThumbnail
