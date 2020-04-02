import React from 'react'
import { withRouter } from "react-router-dom"
import axios from 'axios'
import { Avatar, Badge, Input } from 'antd'
import { MessageOutlined, LikeOutlined } from '@ant-design/icons'

@withRouter
class ArticleDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      user: {},
      article: {},
      commentText: ''
    }
  }

  componentDidMount() {
    this.getInfo()
    this.view()
  }

  getInfo = () => {
    let _id = this.props.location.pathname.substring(9)
    axios.get('/article/detail', { params: {_id} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            user: res.data.data.user,
            article: res.data.data.article
          })
        }
      })
  }

  view = () => {
    let _id = this.props.location.pathname.substring(9)
    axios.put('/article/view',{ _id})
  }

  handleCommentText = (e) => {
    this.setState({
      commentText: e.target.value
    })
  }

  render() {
    return (
      <div className="detail-main">
        <div className="author-info">
          <Avatar src={this.state.user.avater}/>
          <div className="author">
            <a href="/user/" className="name">{this.state.user.name}</a>
            <div className="time">
              <span>{this.state.article.create_time}</span>
              <span>阅读 {this.state.article.viewCount}</span>
            </div>
          </div>
        </div>
        <h1 className="title">{this.state.article.title}</h1>
        <div className='content' dangerouslySetInnerHTML = {{__html: this.state.article.content}} />
        <div className="suspended-panel">
          <div className="panel-btn">
            <Badge count={this.state.article.likeCount} style={{ backgroundColor: '#b2bac2' }}>
              <div className="icon"><LikeOutlined /></div>
            </Badge>
          </div>
          <a className="panel-btn" href="#comment">
            <Badge count={this.state.article.commentCount} style={{ backgroundColor: '#b2bac2' }}>
              <div className="icon"><MessageOutlined /></div>
            </Badge>
          </a>
        </div>
        <div className="comment" id="comment">
          <div className="title">评论</div>
          <div className="comment-form">
            <Avatar src={this.state.user.avater}></Avatar>
            <Input 
              className="text"
              placeholder="输入评论..." 
              value={this.state.commentText}
              onChange={this.handleCommentText}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleDetail