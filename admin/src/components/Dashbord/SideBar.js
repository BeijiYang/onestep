import React, { Component } from 'react'
import styled from 'styled-components'
import {
  withRouter
} from 'react-router-dom'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;


const SideBarWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const LogoWrap = styled.div`
  height: 60px;
  background-color: #B2DFDB;
`

const NavWrap = styled.div`
  background-color: #fff;
  flex-grow: 1;
`

const LogoutWrap = styled.div`
  height: 60px;
  background-color: #B2DFDB;
  display: flex;
  line-height: 60px;
`

const LogoutButton = styled.div`
  flex-basis: 60px;
  background-color: #FF5722;
  text-align: center;
  color: white;
  cursor: pointer;
`

const Username = styled.div`
  flex-grow: 1;
  background-color: #B2DFDB;
`

class SideBar extends Component {

  logout = () => {
    window.localStorage.removeItem('secret')
    this.props.history.push('/')
  }

  handleClick = (e) => {
    console.log(e.key)
    this.props.history.push(e.key)
  }

  render () {
    return (
      <SideBarWrap>
        <LogoWrap>
          Logo
        </LogoWrap>
        <NavWrap>
          <Menu
            onClick={this.handleClick}
            style={{ width: 240 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1','sub2']}
            mode="inline"
            >
            <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>Courses</span></span>}>
              <Menu.Item key="/dashbord/courses">Courses List</Menu.Item>
              <Menu.Item key="/dashbord/courses/new">New Course</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="setting" /><span>Users</span></span>}>
              <Menu.Item key="/dashbord/users">Users List</Menu.Item>
              <Menu.Item key="/dashbord/users/new">New User</Menu.Item>
            </SubMenu>
          </Menu>
        </NavWrap>
        <LogoutWrap>
          <LogoutButton onClick={this.logout}>
            Logout
          </LogoutButton>
          <Username>
            Admin
          </Username>
        </LogoutWrap>
      </SideBarWrap>
    )
  }
}

export default withRouter(SideBar)
