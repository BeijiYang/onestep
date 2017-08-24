import React, { Component } from 'react'
import '../style/episode.css'

class Episode extends Component {
  render(){
    let { episodeName } = this.props.computedMatch.params

    console.log(this.props);
    return(
      <div className='episode-video'>
        <div className='video'>
          video: {episodeName}
        </div>
      </div>
    )
  }
}

export default Episode