import React from 'react'
import ContentLoader from "react-content-loader"

const TubeWatchInfoLoader = (props) => {
    return (
        <ContentLoader
            speed={2}
            width={480}
            height={100}
            viewBox="0 0 480 100"
            backgroundColor="#e6e6e6"
            foregroundColor="#ecebeb"
            style={{ width: '100%', height: 'auto' }}
            {...props}
        >
            <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
            <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
            <rect x="48" y="52" rx="3" ry="3" width="410" height="6" />
            <rect x="48" y="72" rx="3" ry="3" width="380" height="6" />
            <rect x="48" y="92" rx="3" ry="3" width="178" height="6" />
            <circle cx="20" cy="20" r="20" />
        </ContentLoader>
    )
}

export default TubeWatchInfoLoader
