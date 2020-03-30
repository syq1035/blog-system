import React from 'react'
import { Menu } from 'antd'
import { UserOutlined, CommentOutlined, FileTextOutlined } from '@ant-design/icons'
import { Route, Redirect, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import UserManage from '../../components/userManage'
import ArticleManage from '../../components/articleManage'
import CommentManage from '../../components/commentManage'


@withRouter
class Admin extends React.Component {
  
  handleMenu = ({key}) => {
    console.log(key)
    if(key === 1) {
      this.props.history.push('/admin/user')
      // return
    }
    if(key === 2) {
      this.props.history.push('/admin/article')
      // return
    }
    if(key === 3) {
      this.props.history.push('/admin/comment')
      // return
    }
    console.log(this.props)
  }
  render () {
    return (
      <div className="admin">
        <div className="admin-menu">
          <Menu
            theme="dark"
          >
            <Menu.Item key="1">
              <UserOutlined /> 
              <Link to="/admin/user">用户管理</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <FileTextOutlined />
              <Link to="/admin/article">文章管理</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <CommentOutlined />
              <Link to="/admin/comment">评论管理</Link>
            </Menu.Item>
          </Menu>
        </div>
          <Route
            path="/admin/user"
            component={UserManage}
          />
          <Route
            path="/admin/article"
            component={ArticleManage}
          />
          <Route
            path="/admin/comment"
            component={CommentManage}
          />
          <Redirect to="/admin/user" />
        </div>
    )
  }
}

export default Admin


            