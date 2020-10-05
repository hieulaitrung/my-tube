import React from 'react'
import ContentLoader from "react-content-loader"


const TubeWatchLoader = (props) => {
    return (
        <ContentLoader
            speed={2}
            width={530}
            height={370}
            viewBox="0 0 530 370"
            backgroundColor="#e6e6e6"
            foregroundColor="#ecebeb"
            style={{ width: '100%', height: 'auto' }}
            {...props}
        >
            <rect x="0" y="310" rx="2" ry="2" width="350" height="20" />
            <rect x="0" y="340" rx="2" ry="2" width="100" height="15" />
            <rect x="0" y="0" rx="2" ry="2" width="530" height="300" />
        </ContentLoader>
    )
}

export default TubeWatchLoader
