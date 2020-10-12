import React from 'react'
import { BrowserRouter as Router, Switch } from "react-router-dom";
import LoginLayoutRoute from './layout/LoginLayoutRoute'
import DashboardLayoutRoute from './layout/DashboardLayoutRoute'
import WatchLayoutRoute from './layout/WatchLayoutRoute'
import Login from './login'
import Signup from './signup'
import PasswordReset from './password-reset'
import Search from './search'
import MyPage from './mypage'
import Private from './private'
import Watch from './watch'
import Home from './home'

const Routes = () => {
    return (
        <Router>
          <Switch>
            <LoginLayoutRoute path="/login" component={Login} />
            <LoginLayoutRoute path="/signup" component={Signup} />
            <LoginLayoutRoute path="/password-reset" component={PasswordReset} />
            <DashboardLayoutRoute path="/search" component={Search} />
            <DashboardLayoutRoute path="/mypage" component={MyPage} />
            <DashboardLayoutRoute path="/private" component={Private} />
            <WatchLayoutRoute path="/watch" component={Watch} />
            <DashboardLayoutRoute path="/" component={Home} />
          </Switch>
        </Router>
    )
}

export default Routes
