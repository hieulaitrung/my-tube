import React from "react"
import ContentLoader from "react-content-loader"
import { useMediaQuery, useTheme } from "@material-ui/core";

const TubeLoader = (props) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
    
    return (
        !matches ?
            (<ContentLoader
                speed={2}
                width={280}
                height={254}
                viewBox="0 0 280 254"
                style={{ width: '100%', height: 'auto' }}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}
            >

                <rect x="60" y="178" rx="2" ry="2" width="210" height="12" />
                <rect x="60" y="202" rx="2" ry="2" width="140" height="12" />
                <rect x="2" y="0" rx="2" ry="2" width="280" height="160" />
                <circle cx="20" cy="195" r="20" />
            </ContentLoader>) :
           ( <ContentLoader
                speed={2}
                width={280}
                height={254}
                viewBox="0 0 280 254"
                style={{ width: '100%', height: 'auto' }}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}
            >

                <rect x="80" y="178" rx="2" ry="2" width="180" height="12" />
                <rect x="80" y="202" rx="2" ry="2" width="120" height="12" />
                <rect x="2" y="0" rx="2" ry="2" width="280" height="160" />
                <circle cx="40" cy="195" r="20" />
            </ContentLoader>)

    )
}

export default TubeLoader