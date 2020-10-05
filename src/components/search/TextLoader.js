import React from 'react'
import ContentLoader from "react-content-loader"


const TextLoader = (props) => {
    return (
        <ContentLoader
            speed={2}
            width={200}
            height={25}
            viewBox="0 0 200 25"
            backgroundColor="#e6e6e6"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="0" y="0" rx="2" ry="2" width="200" height="25" />
        </ContentLoader>
    )
}

export default TextLoader
