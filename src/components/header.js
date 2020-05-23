import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { Input, Row, Col, Button } from 'antd'
import Register from './modals/register'
import Login from './modals/login'
import UserMenu from '../components/userMenu'

const { Search } = Input;

@withRouter
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
    if (window.sessionStorage.userInfo) {
      this.setState({
        userInfo: JSON.parse(window.sessionStorage.userInfo)
      })
    }
  }

  signOut() {
    this.setState({
      userInfo: ''
    })
    axios.post('/user/signout')
      .then(res => {
        if(res.status === 200 && res.data.code === 0){
          window.sessionStorage.userInfo = '';
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  showRegisterModal = () => {
    this.setState({
      registerModal: true
    })
  }

  closeRegisterModal = () => {
    this.setState({
      registerModal: false
    })
  }

  showLoginModal = () => {
    this.setState({
      loginModal: true
    })
  }

  closeLoginModal = () => {
    this.setState({
      loginModal: false
    })
  }

  toHome = () => {
    this.props.history.push('/home')
  }

  search(value) {
    this.props.history.push('/search', {text: value})
  }

  handlePublish = () => {
    if(this.state.userInfo) {
      this.props.history.push('/editor')
    } else {
      this.showLoginModal()
    }    
  }

  render() {
    return (
      <div className="header">
        <Row justify="space-around">
          <Col span={3} offset={2}>
            <img src={require('../assets/image/logoo.png')} alt="logo" className="logo" />
            <span className="title">博客</span>
            </Col>
          <Col span={3}>
            <Button type="link" onClick={this.toHome}>首页</Button>
            <Button type="link">讨论区</Button>
          </Col>
          <Col span={4}>
            <Search
              placeholder="搜索"
              onSearch={value => this.search(value)}
              style={{ width: 200 }}
            />
          </Col>
          {
            this.state.userInfo ?
            <Col span={1} offset={6}>
              <UserMenu signOut={this.signOut.bind(this)} />
            </Col>
            :
            <Col span={3} offset={4}>
              <Button type="link" onClick={this.showLoginModal} >登录</Button>
              <Button  shape="round" onClick={this.showRegisterModal} >注册</Button>
            </Col>
          }
          <Col span={2}>
            <Button type="primary" shape="round" onClick={this.handlePublish}>
              写文章
            </Button>
          </Col>
          <Col span={3}></Col>
        </Row>
        <Register 
          registerModal={ this.state.registerModal } 
          showLoginModal={ this.showLoginModal }
          close={ this.closeRegisterModal }
        />
        <Login 
          loginModal={ this.state.loginModal }
          showRegisterModal={ this.showRegisterModal}
          getUserInfo={ this.getUserInfo.bind(this) }
          close={ this.closeLoginModal }
        />
      </div>
    )
  }
}

export default Header