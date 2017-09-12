import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './course-list.css'

class CourseList extends Component {
  render () {
    let courses = this.props.courses.map((item, i) => (
      <Link to={`/${item.title}`} key={i} className='course'>
        <img src={`${item.post}`} alt='poster' className='poster' />
        <h2>{item.title}</h2>
        <p>{item.msg}</p>
      </Link>
    ))

    return (
      <div className='course-list'>
        {courses}
      </div>
    )
  }
}

export default CourseList