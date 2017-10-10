import React, { Component } from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'

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
          MainWrap
        </MainWrap>
      </DashbordWrap>
    )
  }
}

export default Dashbord
