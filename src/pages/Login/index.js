import React from 'react'
import './login.scss'
import Logo from '@assets/ad_logo.png'
import { connect } from 'react-redux'
import { getLoginIn } from './store/actions'
import { User } from '@utils/request'

class Login extends React.Component {
  state={
    name: 'abc'
  }
  componentDidMount() {
    this.props.loginIn()
  }
  render() {
  console.log('DefinePlugin',DEV_TOKEN)
  console.log('redux',this.props.login)
  console.log('全局变量自己写的',User.token)
    return (
      <div className="loginPage">
        { this.state.name}
        <img src={Logo} />
      </div>
    )
  }
}
const mapStateToProps = ({login}) =>{
  return {
    login
  }
}
const mapDispatchToProps= dispatch => ({
  loginIn() {
    return dispatch(getLoginIn())
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)