import React, { Component } from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'
import Home from '../Home/Home'
import Dashbord from '../Dashbord/Dashbord'

class Main extends Component {
  render () {
    return (
      <div className='main'>
        <Route exact path='/' component={Home} />
        <Route path='/dashbord' render={ () => {
          return window.localStorage.getItem('secret') ? <Dashbord /> : <Redirect to='/' />
        }} />
      </div>
    )
  }
}

export default Main
