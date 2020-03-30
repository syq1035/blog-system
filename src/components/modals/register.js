import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Modal, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { registerSuccess, registerFailue } from '../../store/modules/user'

@connect(
  state => state.user,
  { registerSuccess, registerFailue }
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      name: '',
      password: '',
      rePassword: ''
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

  handleRepassword = (e) => {
    this.setState({
      rePassword: e.target.value
    })
  }

  handleRegister = () => {
    if(!this.state.name) {
      message.error('请输入正确的用户名')
      return 
    }
    if(!this.state.password) {
      message.error('请输入正确的密码')
      return 
    }
    if(!this.state.rePassword) {
      message.error('请再次正确的密码')
      return 
    }
    if(this.state.rePassword !== this.state.password) {
      message.error('与上次输入的密码不同')
      return 
    }
    let {name, password} = this.state
    axios.post('/user/register', {name, password})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.props.registerSuccess(res.data);
          this.props.close();
          message.success(res.data.message, 1);
          this.setState({
            name: '',
            password: '',
            rePassword: ''
          })
          console.log(this.props)
        } else {
          this.props.registerFailue(res.data.message);
          message.error(res.data.message, 1);
        }
      })
  }

  render() {
    return (
      <Modal 
        title="注册" 
        visible={this.props.registerModal}
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
          prefix={<LockOutlined />} 
          onChange={this.handlePassword}
          value={this.state.password} />
        <Input.Password 
          className="login-input" 
          placeholder="请再次输入密码" 
          prefix={<LockOutlined />} 
          onChange={this.handleRepassword}
          value={this.state.rePassword} />
        <Button className="login-btn" type="primary" onClick={this.handleRegister}>注册</Button>
      </Modal>
    )
  }
}

export default Register;