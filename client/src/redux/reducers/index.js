import courses from './courses'
import fakeAuth from './fakeAuth'
import form from './form'
import profile from './profile'
import notification from './notification'
import {combineReducers} from 'redux'
import course from './course'
import episode from './episode'
import smsSend from './smsSend'

const rootReducer = combineReducers({
  course,
  courses,
  fakeAuth,
  form,
  profile,
  notification,
  episode,
  smsSend,
})

export default rootReducer
