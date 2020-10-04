import React, { useMemo } from 'react'
import { CardMedia } from '@material-ui/core';

const TubeThumbnail = (props) => {
    const className = props.className;
    const tube = props.tube;

    const thumbnail = useMemo(
        () => {
            try {
                const thumbnails = tube.thumbnails.sort((i,j) => i.width -  j.width);
                return thumbnails[thumbnails.length-1].url;
            } catch (e) {
                return `https://via.placeholder.com/256`
            }
            // Do expensive calculation and return.
        },
        [tube]
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
