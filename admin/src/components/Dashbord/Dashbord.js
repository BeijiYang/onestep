import React, { Component } from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import {
  Route,
  Switch
 } from 'react-router-dom'
import CourseList from '../Course/CourseList'
import NewCourse from '../Course/NewCourse'
import UserList from '../User/UserList'
import NewUser from '../User/NewUser'

const DashbordWrap = styled.div`
  height: 100vh;
  display: flex;
`

const SideBarWrap = styled.div`
  flex-basis: 200px;
`

const MainWrap = styled.div`
  flex-grow: 1;
`
const TopHeaderWrap = styled.div`
  height: 60px;
  background-color: #00796B;
`

class Dashbord extends Component {
  render () {
    return (
      <DashbordWrap>
        <SideBarWrap>
          <SideBar />
        </SideBarWrap>
        <MainWrap>
          <TopHeaderWrap />
          <Switch>
            <Route path='/dashbord/courses/new' component={NewCourse} />
            <Route path='/dashbord/courses' component={CourseList} />
            <Route path='/dashbord/users/new' component={NewUser} />
            <Route path='/dashbord/users' component={UserList} />
          </Switch>
        </MainWrap>
      </DashbordWrap>
    )
  }
}

export default Dashbord
