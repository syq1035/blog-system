import React from 'react'
import { withRouter } from "react-router-dom"
import { Menu } from 'antd'
import { ArrowLeftOutlined, UserOutlined, CommentOutlined, FileTextOutlined } from '@ant-design/icons'
import { Route, Redirect, Link } from "react-router-dom";
import UserManage from './userManage'
import ArticleManage from './articleManage'
import CommentManage from './commentManage'

@withRouter
class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 'user'
    }
  }

  componentDidMount() {
    const path = this.props.location.pathname.substring(7)
    if(path) {
      this.setState({
        current: path
      })
    }
    if(path === 'article'){
      this.props.history.push('/admin/article')
    }
    if(path === 'comment'){
      this.props.history.push('/admin/comment')
    }
  }

  handleMenu = ({key}) => {
    this.setState({
      current: key
    })
  }

  render () {
    return (
      <div className="admin">
        <div className="admin-menu">
          <Menu
            theme="dark"
            selectedKeys={[this.state.current]}
            onClick={this.handleMenu}
          >
            <Menu.Item key="home">
              <ArrowLeftOutlined />
              <Link to="/home">回首页</Link>
            </Menu.Item>
            <Menu.Item key="user">
              <UserOutlined /> 
              <Link to="/admin/user">用户管理</Link>
            </Menu.Item>
            <Menu.Item key="article">
              <FileTextOutlined />
              <Link to="/admin/article">文章管理</Link>
            </Menu.Item>
            <Menu.Item key="comment">
              <CommentOutlined />
              <Link to="/admin/comment">评论管理</Link>
            </Menu.Item>
          </Menu>
        </div>
          <Route path="/admin/user" component={UserManage} />
          <Route path="/admin/article" component={ArticleManage} />
          <Route path="/admin/comment" component={CommentManage} />
          <Redirect to="/admin/user" />
      </div>
    )
  }
}

export default Admin


            