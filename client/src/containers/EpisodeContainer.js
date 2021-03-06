import React, {Component} from 'react'
import {Redirect, matchPath} from 'react-router-dom'
import {connect} from 'react-redux'
// import Episode from '../components/Episode/Episode'
import {fetchEpisode} from '../redux/actions/contentAction'
import {getEpisode} from '../redux/selectors/commonSelectors.js'
import LoadingComponent from '../components/common/Loading'
import Loadable from 'react-loadable'

const AsyncEpisode = Loadable({
  loader: () => import('../components/Episode/Episode'),
  loading: LoadingComponent,
  delay: 300,
})

class EpisodeContainer extends Component {
  componentDidMount() {
    const {courseName, episodeName} = this.props.match.params
    this.props.fetchEpisode({courseName, episodeName})
  }

  componentWillReceiveProps() {
    if (this.props.history.location !== this.props.location) {
      let params = this.props.history.location.pathname.split('/')
      const [ , courseName, episodeName] = params
      this.props.fetchEpisode({courseName, episodeName})
    }
  }

  render() {
    // console.log(this.props);
    const {episode: {status}, match: {params: {episodeName}}} = this.props

    // 404: /path/whatever
    const match = matchPath(this.props.location.pathname, {
      path: this.props.match.path,
    })
    if (!match.isExact) {
      return <Redirect to={{pathname: '/404'}} />
    }

    switch (status) {
      case 'LOADING': {
        return <LoadingComponent />
      }
      case 'SUCCESS': {
        const {courseName} = this.props.match.params
        const episodeState = this.props.episode
        // VideoJsOptions for this Course
        const EpisodeVideoJsOptions = {
          autoplay: false,
          controls: true,
          sources: [
            {
              src: `${episodeState.vlink}/${episodeName}.mp4`,
              type: 'video/mp4',
            },
          ],
          fluid: 'true', // put the player in the VideoPlayerWrap box
          playbackRates: [0.75, 1, 1.5, 2],
          controlBar: {
            volumePanel: {
              inline: false, // vertical VolumeControl
            },
          },
          // Using A Plugin
          plugins: {
            setStateandFocusPlugin: true,
          },
        }

        return (
          <div>
            <AsyncEpisode
              episodeState={episodeState}
              courseName={courseName}
              videoJsOptions={EpisodeVideoJsOptions}
            />
          </div>
        )
      }
      case 'FAILURE': {
        return (
          <div>
            <div>信息加载失败</div>
          </div>
        )
      }
      default: {
        throw new Error('unexpected status ' + status)
      }
    }
  }
}

const mapStateToProps = state => ({
  episode: getEpisode(state),
})

export default connect(mapStateToProps, {fetchEpisode})(EpisodeContainer)
