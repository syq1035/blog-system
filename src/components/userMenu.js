import React from 'react'
import axios from 'axios'
import { withRouter } from "react-router-dom"
import { Avatar, Menu, Dropdown } from 'antd'
import {  CaretDownOutlined, UserOutlined, SettingOutlined, ExportOutlined } from '@ant-design/icons'

@withRouter
class userMenu extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      userInfo: ''
    }
    if (window.sessionStorage.userInfo) {
        this.state.userInfo = JSON.parse(window.sessionStorage.userInfo)
    }
  }

  signOut() {
    axios.post('/user/signout')
      .then(res => {
        if(res.status === 200 && res.data.code === 0){
          window.sessionStorage.userInfo = '';
          if(this.props.match.path !== '/editor') {
            this.props.signOut()
          }
          this.props.history.push('/home')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleMenuClick = ({key}) => {
    if(key === 'signout') {
      this.signOut()
      return
    }
    if(key === 'myhome') {
      this.props.history.push('/user/'+this.state.userInfo._id)
      return
    }
    if(key === 'setting') {
      this.props.history.push('/setting')
      return
    }
    if(key === 'admin') {
      this.props.history.push('/admin')
      return
    }
  }

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="myhome">
          <span>
            <UserOutlined />
            我的主页
          </span>
        </Menu.Item>
        {
          this.state.userInfo && !this.state.userInfo.type ? 
          <Menu.Item key="admin">
            <span>
              <ExportOutlined />
              系统管理
            </span>
          </Menu.Item>
          : null
        }
        <Menu.Item key="setting">
          <span>
            <SettingOutlined />
            设置
          </span>
        </Menu.Item>
        <Menu.Item key="signout">
          <span>
            <ExportOutlined />
            退出登录
          </span>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu}>
        <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <Avatar src={this.state.userInfo.avatar} />
          {
            this.props.match.path !== '/editor' ? 
            <CaretDownOutlined /> : null
          }
        </div>
      </Dropdown>
    )
  }
}

export default userMenu