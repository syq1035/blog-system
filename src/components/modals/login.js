import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Modal, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { withRouter } from "react-router-dom";
import { loginSuccess, loginFailure } from '../../store/modules/user'

@withRouter
@connect(
  state => state.user,
  { loginSuccess, loginFailure },
)
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      name: '',
      password: ''
    }
  }

  handleName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleLogin = () => {
    if(!this.state.name) {
      message.error('请输入正确的用户名')
      return 
    }
    if(!this.state.password) {
      message.error('请输入正确的密码')
      return 
    }
    let {name, password} = this.state
    axios.post('/user/login', {name, password})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.props.loginSuccess(res.data);
          window.sessionStorage.userInfo = JSON.stringify(res.data.data);
          message.success(res.data.message, 1);
          this.props.close();
          this.setState({
            name: '',
            password: ''
          })
          if(res.data.data.type) {
            this.props.getUserInfo()
            this.props.history.push('/user/'+res.data.data._id)
          } else {
            this.props.history.push('/admin')
          }
        } else {
          this.props.loginFailure(res.data.message);
          message.error(res.data.message, 1);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  showRegister = () => {
    this.props.close()
    this.props.showRegisterModal()
  }

  render() {
    return (
      <Modal 
        className="login-modal"
        title="登录" 
        visible={this.props.loginModal}
        onCancel={this.props.close}
        centered
        width={360}
        footer={null}
      >
        <Input 
          className="login-input" 
          placeholder="请输入用户名" 
          value={this.state.name}
          onChange={this.handleName}
          prefix={<UserOutlined />} />
        <Input.Password
          className="login-input" 
          placeholder="请输入密码" 
          value={this.state.password}
          onChange={this.handlePassword}
          prefix={<LockOutlined />} />
        <Button className="login-btn" type="primary" onClick={this.handleLogin}>登录</Button>
        <div className="alink">
          <Button type="link" onClick={this.showRegister} >还没账号，去注册</Button>
        </div>
      </Modal>
    )
  }
}

export default Login