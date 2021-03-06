import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Login from '../components/Login/Login'
import {login} from '../redux/actions/authAction'
import {
  getFormState,
  getCurrentUser,
} from '../redux/selectors/commonSelectors.js'
import {
  formErrInit,
  passwordIsRequired,
  passwordIsValid,
  passwordsInconsistent,
  passwordsConsistent,
  passwordTooShort,
  usernameIsRequired,
  usernameIsValid,
  phoneNumNotValid,
  phoneNumIsValid,
  smsCodeIsRequired,
  smsCodeIsValid,
  alter,
} from '../redux/actions/formAction'
import PropTypes from 'prop-types'

class LoginContainer extends Component {
  state = {
    username: '',
    phoneNum: '',
    smsCode: '',
    password: '',
    passwordConsistent: '',
  }

  componentWillMount() {
    this.props.formErrInit()
    this.setState({
      username: '',
      phoneNum: '',
      smsCode: '',
      password: '',
      passwordConsistent: '',
    })
  }

  getUsername = username => {
    this.setState({
      username: username,
    })
    this.checkUsername(username)
  }

  getPhoneNum = phoneNum => {
    this.setState({
      phoneNum: phoneNum,
    })
    this.checkPhoneNum(phoneNum)
  }

  getSmsCode = smsCode => {
    this.setState({
      smsCode: smsCode,
    })
    this.checkSmsCode(smsCode)
  }

  getPassword = password => {
    this.setState({
      password: password,
    })
    this.checkPassword(password)
  }

  getPasswordConsistent = passwordConsistent => {
    this.setState({
      passwordConsistent: passwordConsistent,
    })
    this.checkpasswordConsistent()
  }

  checkUsername = username => {
    if (!username) {
      this.props.usernameIsRequired()
    } else {
      this.props.usernameIsValid()
    }
  }

  checkPhoneNum = phoneNum => {
    const phoneNumPattern = /^1\d{10}$/
    if (!phoneNumPattern.test(phoneNum)) {
      this.props.phoneNumNotValid()
    } else {
      this.props.phoneNumIsValid()
    }
  }

  checkPassword = password => {
    // if (!password) {
    if (password.length < 6) {
      // this.props.passwordIsRequired()
      this.props.passwordTooShort()
    } else {
      this.props.passwordIsValid()
    }
  }

  checkpasswordConsistent = () => {
    let {password, passwordConsistent} = this.state

    if (passwordConsistent !== password) {
      this.props.passwordsInconsistent()
    } else {
      this.props.passwordsConsistent()
    }
  }

  checkSmsCode = smsCode => {
    if (!smsCode) {
      this.props.smsCodeIsRequired()
    } else {
      this.props.smsCodeIsValid()
    }
  }

  alter = data => {
    // 切换表单，重新初始化表单信息、报错信息。
    this.setState({
      username: '',
      phoneNum: '',
      smsCode: '',
      password: '',
      passwordConsistent: '',
    })
    this.props.formErrInit()
    this.props.alter(data)
  }

  recheckForm = function*() {
    let userInfo = yield

    let {username, password, passwordConsistent, phoneNum, smsCode} = userInfo
    this.checkUsername(username)
    this.checkPhoneNum(phoneNum)
    this.checkSmsCode(smsCode)
    this.checkPassword(password)
    this.checkpasswordConsistent({password, passwordConsistent})

    yield
    let {
      tabValue,
      usernameIsValid,
      phoneNumIsValid,
      passwordIsValid,
      passwordConsistentIsValid,
      smsCodeIsValid,
    } = this.props.loginState

    if (
      (tabValue === 0 && phoneNumIsValid && passwordIsValid) ||
      (tabValue === 1 &&
        phoneNumIsValid &&
        smsCodeIsValid &&
        usernameIsValid &&
        passwordIsValid &&
        passwordConsistentIsValid)
    ) {
      console.log('通过验证')

      this.props.login(userInfo)
    } else {
      console.log('未通过验证')
    }
  }

  handleSubmit = () => {
    let foo = this.recheckForm()
    foo.next()

    foo.next(this.state)
    setTimeout(() => {
      foo.next()
    }, 50)
  }

  render() {
    const {isAuthenticated} = this.props.currentUser
    const refererState = this.props.location.state

    // 跳回登录前的页面
    let refererPath
    if (!refererState || !refererState.from) {
      // 直接点登录按钮而来
      // console.log('home')
      refererPath = '/'
    } else if (refererState.from.pathname) {
      // 从受保护课程页面直接跳转而来
      // console.log('direct; course')
      refererPath = refererState.from.pathname
    } else {
      // 微信登录页面相关
      // console.log('from wc; course')
      refererPath = refererState.from.from.pathname
    }

    if (isAuthenticated) {
      if (refererPath === '/') {
        this.props.history.goBack()
        return null
      }
      return <Redirect to={refererPath} />
    }

    return (
      <Login
        getUsername={this.getUsername}
        getPhoneNum={this.getPhoneNum}
        getSmsCode={this.getSmsCode}
        getPassword={this.getPassword}
        getPasswordConsistent={this.getPasswordConsistent}
        onSubmit={this.handleSubmit}
        sendMsg={this.sendMsg}
        alter={this.alter}
        errorText={this.props.loginState.testErrObj}
        tabValue={this.props.loginState.tabValue}
        phoneNumIsValid={this.props.loginState.phoneNumIsValid}
        phoneNum={this.state.phoneNum}
      />
    )
  }
}

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
  passwordIsRequired: PropTypes.func.isRequired,
  passwordIsValid: PropTypes.func.isRequired,
  passwordsInconsistent: PropTypes.func.isRequired,
  passwordsConsistent: PropTypes.func.isRequired,
  passwordTooShort: PropTypes.func.isRequired,
  usernameIsRequired: PropTypes.func.isRequired,
  usernameIsValid: PropTypes.func.isRequired,
  phoneNumNotValid: PropTypes.func.isRequired,
  phoneNumIsValid: PropTypes.func.isRequired,
  smsCodeIsRequired: PropTypes.func.isRequired,
  smsCodeIsValid: PropTypes.func.isRequired,
  alter: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  loginState: getFormState(state),
})

export default connect(mapStateToProps, {
  login,
  formErrInit,
  passwordIsRequired,
  passwordIsValid,
  passwordsInconsistent,
  passwordsConsistent,
  passwordTooShort,
  usernameIsRequired,
  usernameIsValid,
  phoneNumNotValid,
  phoneNumIsValid,
  smsCodeIsRequired,
  smsCodeIsValid,
  alter,
})(LoginContainer)
