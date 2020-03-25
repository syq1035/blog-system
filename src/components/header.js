import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Input, Row, Col, Button, Menu, Dropdown, message } from 'antd'
import { CaretDownOutlined, UserOutlined, ExportOutlined } from '@ant-design/icons'
import Register from './modals/register'
import Login from './modals/login'

const { Search } = Input;

@connect(
  state => state.user
)
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      registerModal: false,
      loginModal: false,
      userInfo: ''
    }
  }

  componentDidMount() {
    this.getUserInfo()
  }

  getUserInfo() {
    axios.get('/user/info')
      .then(res => {
        if(res.status === 200 && res.data.code === 0){
          this.setState({
            userInfo: res.data.data
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  signOut() {
    axios.post('/user/signout')
      .then(res => {
        if(res.status === 200 && res.data.code === 0){
          this.setState({
            userInfo: ''
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  showRegisterModal() {
    this.setState({
      ...this.state,
      registerModal: true
    })
  }

  closeRegisterModal() {
    this.setState({
      ...this.state,
      registerModal: false
    })
  }

  showLoginModal() {
    this.setState({
      ...this.state,
      loginModal: true
    })
  }

  closeLoginModal() {
    this.setState({
      ...this.state,
      loginModal: false
    })
  }

  handleRegister = () => {
    this.showRegisterModal()
  }

  handleLogin = () => {
    this.showLoginModal()
  }

  handleMenuClick = ({key}) => {
    console.log(key)
    if(key === 'signout'){
      this.signOut()
    }
  }

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="0">
          <a target="_blank">
            <UserOutlined />
            我的主页
          </a>
        </Menu.Item>
        <Menu.Item key="signout">
          <a>
            <ExportOutlined />
            退出登录
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className="header">
        <Row justify="space-around">
          <Col span={3} offset={2}>
            <img src={require('../assets/image/logoo.png')} alt="头像" className="logo" />
            <span className="title">博客</span>
            </Col>
          <Col span={3}>
            <Button type="link">首页</Button>
            <Button type="link">讨论区</Button>
          </Col>
          <Col span={4}>
            <Search
              placeholder="搜索"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </Col>
          {
            this.state.userInfo ?
            <Col span={1} offset={6}>
              <Dropdown overlay={menu}>
                <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <img src={require('../assets/image/7.jpg')} alt="头像" className="avatar"></img>
                  <CaretDownOutlined />
                </div>
              </Dropdown>
            </Col>
            :
            <Col span={3} offset={4}>
              <Button type="link" onClick={this.handleLogin} >登录</Button>
              <Button  shape="round" onClick={this.handleRegister} >注册</Button>
            </Col>
          }
          <Col span={2}>
            <Button type="primary" shape="round">
              写文章
            </Button>
          </Col>
          <Col span={3}></Col>
        </Row>
        <Register 
          registerModal={ this.state.registerModal } 
          close={ this.closeRegisterModal.bind(this) }
        />
        <Login 
          loginModal={ this.state.loginModal }
          getUserInfo={ this.getUserInfo.bind(this) }
          close={ this.closeLoginModal.bind(this) }
        />
      </div>
    )
  }
}

export default Header