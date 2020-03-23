import React from 'react'
import { Input, Row, Col, Button  } from 'antd'

const { Search } = Input;

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false
    }
  }
  handleRegister = () => {
    this.props.showRegisterModal()
  }
  handleLogin = () => {
    this.props.showLoginModal()
  }

  render() {
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
            this.state.isLogin ?
            <Col span={1} offset={6}>
              <img src={require('../assets/image/7.jpg')} alt="头像" className="avatar"></img>
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
      </div>
    )
  }
}