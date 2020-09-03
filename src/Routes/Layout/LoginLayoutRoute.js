import React from 'react'
import {
    Route
} from 'react-router-dom'

const LoginLayout = (children, ...rest) => {
    return (
        <div>This is login</div>
    )
}

const LoginLayoutRoute = ({component: Component, ...rest}) => { 
    return (
        <Route {...rest} render={matchProps => (
            <LoginLayout>
                <Component {...matchProps} />
            </LoginLayout>
        )} />
    )
}

export default LoginLayoutRoute
