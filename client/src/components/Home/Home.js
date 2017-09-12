import React from 'react'
import { Link } from 'react-router-dom'
import CourseList from '../../containers/CourseListContainer'
import './home.css'

export default () => (
  <div className='home'>
    <Link to='/Login' className='button'>微信登录</Link>
    <CourseList />
  </div>
)