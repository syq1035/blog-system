import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Modal, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { loginSuccess, loginFailure } from '../../../store/modules/user'

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
      ...this.state,
      name: e.target.value
    })
  }

  handlePassword = (e) => {
    this.setState({
      ...this.state,
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
          this.props.loginSuccess(res.data.data);
          let userInfo = {
            _id: res.data.data._id,
            name: res.data.data.name,
            avatar: res.data.data.avatar,
          };
          window.sessionStorage.userInfo = JSON.stringify(userInfo);
          message.success(res.data.message, 1);
          this.props.close();
          this.setState({
            name: '',
            password: '',
          });
        } else {
          this.props.loginFailure(res.data.message);
          message.error(res.data.message, 1);
        }
      })
      .catch(err => {
        console.log(err);
      });
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
      </Modal>
    )
  }
}

export default Login