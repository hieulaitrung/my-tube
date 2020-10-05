import React from 'react'
import ContentLoader from "react-content-loader"

const NextTubeLoader = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={385}
      height={100}
      viewBox="0 0 385 100"
      backgroundColor="#e6e6e6"
      foregroundColor="#ecebeb"
      style={{ width: '100%', height: 'auto' }}
      {...props}
    >
      <rect x="190" y="-1" rx="5" ry="5" width="220" height="25" />
      <rect x="190" y="40" rx="5" ry="5" width="150" height="15" />
      <rect x="0" y="0" rx="0" ry="0" width="180" height="100" />
    </ContentLoader>
  )
}

export default NextTubeLoader
