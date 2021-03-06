import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {requireAuthentication} from './CheckToken'
import Loadable from 'react-loadable'
import LoadingComponent from '../components/common/Loading'
import ProfileSettings from './ProfileSettingsContainer'
import {requireEpisodeAuth} from './CheckEpisodeAuth'

const AsyncHome = Loadable({
  loader: () => import('../components/Home/Home'),
  loading: LoadingComponent,
  delay: 300,
})

const AsyncSignup = Loadable({
  loader: () => import('./SignupContainer'),
  loading: LoadingComponent,
  delay: 300,
})

const AsyncLogin = Loadable({
  loader: () => import('./LoginContainer'),
  loading: LoadingComponent,
  delay: 300,
})

const AsyncWechatLogin = Loadable({
  loader: () => import('./WechatLoginContainer'),
  loading: LoadingComponent,
  delay: 300,
})

const AsyncProfile = Loadable({
  loader: () => import('./ProfileContainer'),
  loading: LoadingComponent,
  delay: 300,
})

const AsyncCourse = Loadable({
  loader: () => import('./CourseContainer'),
  loading: LoadingComponent,
  delay: 300,
})

const AsyncEpisode = Loadable({
  loader: () => import('./EpisodeContainer'),
  loading: LoadingComponent,
  delay: 300,
})

const AsyncPay = Loadable({
  loader: () => import('./PayContainer'),
  loading: LoadingComponent,
  delay: 300,
})

const AsyncNotFound = Loadable({
  loader: () => import('../components/common/NotFound'),
  loading: LoadingComponent,
  delay: 300,
})

class Main extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AsyncHome} />
          <Route path="/wechatLogin" component={AsyncWechatLogin} />
          <Route path="/login" component={AsyncLogin} />
          <Route path="/signup" component={AsyncSignup} />
          <Route path="/pay" component={AsyncPay} />
          <Route
            exact
            path="/user/profile"
            component={requireAuthentication(AsyncProfile)}
          />
          <Route
            path="/settings/account"
            component={requireAuthentication(ProfileSettings)}
          />
          <Route exact path="/:courseName" component={AsyncCourse} />
          <Route
            path="/:courseName/:episodeName"
            component={requireAuthentication(requireEpisodeAuth(AsyncEpisode))}
          />
          <Route component={AsyncNotFound} />
        </Switch>
      </Router>
    )
  }
}

export default Main
