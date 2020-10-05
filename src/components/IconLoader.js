import React from "react"
import ContentLoader from "react-content-loader"

const IconLoader = (props) => (
    <ContentLoader 
    speed={2}
    width={32}
    height={32}
    viewBox="0 0 32 32"
    backgroundColor="#e6e6e6"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="16" cy="16" r="16" />
  </ContentLoader>
)

export default IconLoader