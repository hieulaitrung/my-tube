import React from 'react'
import ContentLoader from "react-content-loader"
import { useTheme, useMediaQuery } from '@material-ui/core';


const SearchTubeLoader = (props) => {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

    return (
        !matches ?
            <ContentLoader
                speed={2}
                width={900}
                height={160}
                viewBox="0 0 900 160"
                backgroundColor="#e6e6e6"
                foregroundColor="#ecebeb"
                {...props}
            >
                <rect x="280" y="0" rx="2" ry="2" width="288" height="30" />
                <rect x="280" y="60" rx="2" ry="2" width="200" height="20" />
                <rect x="0" y="0" rx="2" ry="2" width="250" height="400" />
            </ContentLoader> :
            <ContentLoader
                speed={2}
                width={500}
                height={200}
                viewBox="0 0 500 200"
                backgroundColor="#e6e6e6"
                foregroundColor="#ecebeb"
                {...props}
            >
                <rect x="220" y="0" rx="2" ry="2" width="100" height="20" />
                <rect x="220" y="40" rx="2" ry="2" width="60" height="20" />
                <rect x="0" y="0" rx="2" ry="2" width="200" height="140" />
            </ContentLoader>
    )

}

export default SearchTubeLoader
