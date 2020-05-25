import React from 'react'
import { Avatar, Menu, List, Button, message } from 'antd'
import { MessageOutlined, LikeOutlined, LikeTwoTone, EyeOutlined } from '@ant-design/icons'
import axios from 'axios'
import { withRouter } from "react-router-dom"
import Header from '../../components/header'
import momentDate from '../../utils/index'

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
      likeCount: {},
      likeArticle: [],
      commentCount: {},
      articles: [],
      nav: 'article'
    }
    this.user_id = this.props.location.pathname.substring(6)
    if (window.sessionStorage.userInfo) {
      this.localUser = JSON.parse(window.sessionStorage.userInfo)
    }
  }

  componentDidMount() {
    this.getUserInfo()
    this.getArticleInfo()
    this.getLikeCount()
    this.getCommentCount()
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
            articles: [...res.data.data]
          })
        }
      })
  }

  getCollectList() {
    axios.get('/collect/user', { params: {user: this.user_id} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            articles: [...res.data.data]
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

  getLikeCount = () => {
    axios.get('/like/allCount')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          let likeCount = {}
          res.data.data.likeCount.map(item => {
            likeCount[item._id] = item.likeCount
            return item
          })
          this.setState({
            likeCount: likeCount,
            likeArticle: [...res.data.data.likeArticle]
          })
        }
      })  
  }

  getCommentCount = () => {
    axios.get('/comment/allCount')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          let commentCount = {}
          res.data.data.map(item => {
            commentCount[item._id] = item.commentCount
            return item
          })
          this.setState({
            commentCount: commentCount
          })
        }
      })  
  }

  handleLike (id){
    if(window.sessionStorage.userInfo) {
      const userInfo = JSON.parse(window.sessionStorage.userInfo)
      const like = {
        article: id,
        user: userInfo._id
      }
      if(this.state.likeArticle.includes(id)) {
        axios.post('/like/del', like)
        .then(res => {
          let count = this.state.likeCount[id] - 1
          let likeArticle = this.state.likeArticle
          likeArticle.splice(likeArticle.indexOf(id), 1);
          this.setState({
            likeArticle: likeArticle,
            likeCount: {...this.state.likeCount, [id]: count}
          })
        })
      } else {
        axios.post('/like/new', like)
        .then(res => {
          let count = (this.state.likeCount[id] ||0) + 1
          let likeArticle = this.state.likeArticle
          likeArticle.push(id);
          this.setState({
            likeArticle: likeArticle,
            likeCount: {...this.state.likeCount, [id]: count}
          })
        })
      }
    } else {
      message.error('请先登录~')
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
            <div className="follow">
              {
                this.user_id === this.localUser._id ?
                <a href='/setting'>修改个人信息</a>
                :
                <Button type="primary">关注</Button>
              }
            </div>
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
                      <a onClick={this.handleLike.bind(this, item._id)}>
                        <IconText icon={this.state.likeArticle.includes(item._id)? LikeTwoTone : LikeOutlined} text={this.state.likeCount[item._id] || 0} key="list-vertical-like-o" />
                      </a>,
                      <a href={'/article/'+item._id+'#comment'}>
                        <IconText icon={MessageOutlined} text={this.state.commentCount[item._id] || 0} key="list-vertical-message" />
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <a href={'/user/'+item.author._id}>
                          <Avatar src={item.author.avatar} />
                        </a>
                      }
                      title={
                        <div className="list-title">
                          <a href={'/article/'+item._id} target="_blank" rel="noopener noreferrer" className="title">{item.title}</a>
                          <div className="dec">
                            <span>{item.author.name}</span>
                            <span className="time">{momentDate(item.create_time)}</span>
                          </div>
                        </div>
                      }
                      description={item.description}
                    />
                    <a href={'/article/'+item._id} target="_blank" rel="noopener noreferrer" className="title">
                      <div className='list-content' dangerouslySetInnerHTML = {{__html: item.content}} />
                    </a>
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