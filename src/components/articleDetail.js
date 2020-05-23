import React from 'react'
import { withRouter } from "react-router-dom"
import axios from 'axios'
import { Avatar, Badge, Input, message, Button } from 'antd'
import { MessageFilled, LikeFilled, StarFilled } from '@ant-design/icons'
import CommentList from '../components/comment'
import momentDate from '../utils/index'
const { TextArea } = Input;

@withRouter
class ArticleDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      user: {},
      article: {},
      comments: [],
      commentText: '',
      likeCount: 0,
      like: false,
      collect: false
    }
    this.article_id = this.props.location.pathname.substring(9)
  }

  componentDidMount() {
    this.getInfo()
    this.getLikeCount()
    this.getComments()
    this.view()
    if(window.sessionStorage.userInfo) {
      const userInfo = JSON.parse(window.sessionStorage.userInfo)
      const data = {
        article: this.article_id,
        user: userInfo._id
      }
      this.getLikeStatus(data)
      this.getCollectStatus(data)
    }
    // this.scrollToAnchor()
  }

  scrollToAnchor() {
    let anchorName = this.props.location.hash;
    if (anchorName) {
        anchorName = anchorName.replace("#","")
        let anchorElement = document.getElementById(anchorName)
        if(anchorElement) { 
          anchorElement.scrollIntoView(
            // {behavior: 'smooth'}
          );
        }
    }
  }

  getInfo = () => {
    axios.get('/article/detail', { params: {_id: this.article_id} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            user: res.data.data.user,
            article: res.data.data.article
          })
        }
      })
  }

  getLikeCount = () => {
    axios.get('/like/count', {params: {article: this.article_id}})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            likeCount: res.data.data.count
          })
        }
      })
  }

  getComments = () => {
    axios.get('/comment/article', {params: {article: this.article_id}})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            comments: res.data.data
          })
          this.scrollToAnchor()
        }
      })
  }

  getLikeStatus = (data) => {
    axios.get('/like/info', {params: data})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            like: res.data.data.islike
          })
        }
      })
  }

  getCollectStatus = (data) => {
    axios.get('/collect/info', {params: data})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            collect: res.data.data.iscollect
          })
        }
      })
  }

  view = () => {
    axios.put('/article/view',{_id: this.article_id})
  }

  handleCommentText = (e) => {
    this.setState({
      commentText: e.target.value
    })
  }

  inputOnFocus = () => {
    if(!window.sessionStorage.userInfo) {
      message.error('请登录后评论~')
    }
  }

  handleComment = () => {
    if(!this.state.commentText) {
      message.error('请输入评论')
      return
    }
    const userInfo = JSON.parse(window.sessionStorage.userInfo)
    const comment = {
      article: this.article_id,
      user: userInfo._id,
      content: this.state.commentText
    }
    axios.post('/comment/new', comment)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          message.success('评论成功')
          this.getComments()
          this.setState({
            commentText: ''
          })
        }
      })
  }

  handleLike = () => {
    if(window.sessionStorage.userInfo) {
      const userInfo = JSON.parse(window.sessionStorage.userInfo)
      const like = {
        article: this.article_id,
        user: userInfo._id
      }
      if(this.state.like) {
        axios.post('/like/del', like)
        .then(res => {
          this.setState({
            like: false,
            likeCount: this.state.likeCount? this.state.likeCount-1 : this.state.likeCount
          })
        })
      } else {
        axios.post('/like/new', like)
        .then(res => {
          this.setState({
            like: true,
            likeCount: this.state.likeCount+1
          })
        })
      }
      
    } else {
      message.error('请先登录~')
    }
  }

  handleCollect = () => {
    if(window.sessionStorage.userInfo) {
      const userInfo = JSON.parse(window.sessionStorage.userInfo)
      const collect =  {
        article: this.article_id,
        user: userInfo._id
      }
      if(this.state.collect) {
        axios.post('/collect/del', collect)
        .then(res => {
          if (res.status === 200 && res.data.code === 0) {
            this.setState({
              collect: false
            })
            message.success(res.data.message)
          }
        })
      } else {
        axios.post('/collect/new', collect)
        .then(res => {
          if (res.status === 200 && res.data.code === 0) {
            this.setState({
              collect: true
            })
            message.success(res.data.message)
          }
        })
      }
    } else {
      message.error('请先登录~')
    }
  }

  render() {
    return (
      <div className="detail-main">
        <div className="author-info">
          <a href={'/user/'+this.state.user._id}><Avatar src={this.state.user.avater}/></a>
          <div className="author">
            <a href={'/user/'+this.state.user._id} className="name">{this.state.user.name}</a>
            <div className="time">
              <span>{momentDate(this.state.article.create_time)}</span>
              <span>阅读 {this.state.article.viewCount}</span>
            </div>
          </div>
        </div>
        <h1 className="title">{this.state.article.title}</h1>
        <div className='content' dangerouslySetInnerHTML = {{__html: this.state.article.content}} />
        <div className="suspended-panel">
          <div className="panel-btn">
            <Badge count={this.state.likeCount} style={{ backgroundColor: this.state.like ? '#52c41a' : '#b2bac2' }}>
              <div className="icon" onClick={this.handleLike}>
                <LikeFilled style={{fontSize: 18, color: this.state.like ? '#52c41a' : '#b8b5b5'}} />
              </div>
            </Badge>
          </div>
          <a className="panel-btn" href="#comment">
            <Badge count={this.state.article.commentCount} style={{ backgroundColor: '#b2bac2' }}>
              <div className="icon"><MessageFilled style={{fontSize: 18, color: '#b8b5b5'}} /></div>
            </Badge>
          </a>
          <div className="panel-btn">
              <div className="icon" onClick={this.handleCollect} >
                <StarFilled style={{fontSize: 18, color: this.state.collect ? '#52c41a' : '#b8b5b5'}} />
              </div>
          </div>
        </div>
        <div className="comment" id="comment">
          <div className="title">评论</div>
          <div className="comment-form">
            <Avatar src={this.state.user.avater}></Avatar>
            <TextArea  
              className="text"
              autoSize={{ minRows: 1, maxRows: 4 }}
              placeholder="输入评论..." 
              value={this.state.commentText}
              onChange={this.handleCommentText}
              onPressEnter={this.handleComment}
              onFocus={this.inputOnFocus}
            />
            <Button type="primary" onClick={this.handleComment}>评论</Button>
          </div>
          <div className="comment-list">
            {
              this.state.comments && this.state.comments.length>0 ?
              this.state.comments.map(item => {
               return <CommentList key={item._id} info={item} getComments={this.getComments} />
              })
              : ''
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleDetail