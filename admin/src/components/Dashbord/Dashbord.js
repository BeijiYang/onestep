import React, { Component } from 'react'
import styled from 'styled-components'

const DashbordWrap = styled.div`
  border: 2px solid red;
  height: 100vh;
  display: flex;
`

const SideBarWrap = styled.div`
  border: 2px solid green;
  flex-basis: 150px;
`

const ContentWrap = styled.div`
  border: 2px solid green;
  flex-grow: 1;
`

class Dashbord extends Component {
  render () {
    return (
      <DashbordWrap>
        <SideBarWrap>
          SideBar
        </SideBarWrap>
        <ContentWrap>
          Content
        </ContentWrap>
      </DashbordWrap>
    )
  }
}

export default Dashbord
