import React from 'react'
import { Avatar, Menu, List, Button } from 'antd'
import { MessageOutlined, LikeOutlined, EyeOutlined } from '@ant-design/icons'
import axios from 'axios'
import { withRouter } from "react-router-dom"
import Header from '../../components/header'

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
)

@withRouter
class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      articles: [],
      nav: 'article'
    }
  }

  user_id = this.props.location.pathname.substring(6)

  componentDidMount() {
    this.getUserInfo()
    this.getArticleInfo()
  }

  getUserInfo() {
    axios.get('/user/info', { params: {_id: this.user_id} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            user: res.data.data
          })
        }
      })
  }

  getArticleInfo() {
    axios.get('/article/info', { params: {author: this.user_id} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            articles: res.data.data
          })
        }
      })
  }

  getCollectList() {
    axios.get('/collect/user', { params: {user: this.user_id} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            articles: res.data.data
          })
        }
      })
  }

  getLikeList() {
    axios.get('/like/user', { params: {user: this.user_id} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            articles: res.data.data
          })
        }
      })
  }

  handleMenu = ({key}) => {
    this.setState({
      nav: key
    })
    if(key === 'article') {
      this.getArticleInfo()
      return
    }
    if(key === 'collect') {
      this.getCollectList()
      return
    }
    if(key === 'like') {
      this.getLikeList()
    }
  }

  render() {
    return (
      <div className="home">
        <Header />
        <div className="user-main">
          <div className="user-info">
            <div className="top">
              <Avatar size={48} src={this.state.user.avatar}/>
              <div className="right">
                <span className="name">{this.state.user.name}</span>
              </div>
            </div>
            <Button type="primary">关注</Button>
          </div>
          <div className="detail">
            <div className="list-header">
              <Menu
                mode="horizontal"
                selectedKeys={[this.state.nav]}
                onClick={this.handleMenu}
              >
                <Menu.Item key="article">
                  <span>文章</span>
                </Menu.Item>
                <Menu.Item key="collect">
                  <span>收藏</span>
                </Menu.Item>
                <Menu.Item key="like">
                  <span>赞</span>
                </Menu.Item>
              </Menu>
            </div>
            <div className="infinite-container">
            {
              this.state.articles.length === 0 ? '暂时没有文章~'
              :
              <List
                itemLayout="vertical"
                size="large"
                dataSource={this.state.articles}
                renderItem={item => (
                  <List.Item 
                    key={item._id}
                    actions={[
                      <IconText icon={EyeOutlined} text={item.viewCount} key="list-vertical-star-o" />,
                      <IconText icon={LikeOutlined} text={item.likeCount} key="list-vertical-like-o" />,
                      <IconText icon={MessageOutlined} text={item.commentCount} key="list-vertical-message" />,
                    ]}
                    >
                    <List.Item.Meta
                      avatar={
                        <a href={this.state.nav==='article' ? '/user/'+this.state.user._id : '/user/'+item.user_id}>
                          <Avatar src={this.state.nav==='article' ? this.state.user.avatar : item.user_avatar} />
                        </a>
                      }
                      title={<a href={'/article/'+item._id} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                      description={item.description}
                    />
                    <div className='list-content' dangerouslySetInnerHTML = {{__html: item.content}} />
                  </List.Item>
                )}
              />
            }
            </div>  
          </div>
        </div>
      </div>
    )
  }
}

export default User