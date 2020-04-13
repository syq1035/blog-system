import React from 'react'
import { withRouter } from "react-router-dom"
import { Comment, Avatar, Button, Input, message } from 'antd'
import { MessageOutlined } from '@ant-design/icons'
import axios from 'axios'

const { TextArea } = Input;

@withRouter
class CommentList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      replytoText: '',
      replytoDisplay: false,
      replytoTDisplay: false
    }
    this.article_id = this.props.location.pathname.substring(9)
  }

  // article_id = this.props.location.pathname.substring(9)

  handleReplytoText = (e) => {
    this.setState({
      replytoText: e.target.value
    })
  }

  inputOnFocus = () => {
    if(!window.sessionStorage.userInfo) {
      message.error('请登录后回复~')
    }
  }

  inputOnBlur = () => {
    // this.setState({
    //   replytoDisplay: false
    // })
  }

  changeReplytoDisplay = () => {
    this.setState({
      replytoDisplay: !this.state.replytoDisplay
    })
    
  }
  changeReplytoTDisplay = () => {
    this.setState({
      replytoTDisplay: !this.state.replytoTDisplay
    })
  }


  handleReplyto = () => {
    if(!this.state.replytoText) {
      message.error('请输入回复内容')
      return
    }
    const comment = this.props.info
    const userInfo = JSON.parse(window.sessionStorage.userInfo)
    const replyto = {
      article: this.article_id,
      user: userInfo._id,
      to: comment.user._id,
      content: this.state.replytoText,
      parentId: comment._id
    }
    axios.post('/comment/new', replyto)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          message.success('回复成功')
          this.props.getComments()
          this.setState({
            replytoText: '',
            replytoDisplay: false,
            replytoTDisplay: false
          })
        }
      })
  }

  render() {
    const comment = this.props.info
    return (
      <Comment
        key={comment._id}
        author={<a href={'/user/'+comment.user._id} target="_blank" rel="noopener noreferrer">{comment.user.name}</a>}
        avatar={
          <Avatar
            src={comment.user.avatar}
            alt={comment.user.name}
          />
        }
        content={
          <div>
            <p>{comment.content}</p>
            <div className="reply_to" onClick={this.changeReplytoDisplay}><MessageOutlined />回复</div>
            <div className={this.state.replytoDisplay ? "replyto_show" : "replyto_hidden"}>
              <TextArea  
                className="text"
                autoSize={{ minRows: 1, maxRows: 4 }}
                placeholder="回复" 
                value={this.state.replytoText}
                onChange={this.handleReplytoText}
                onPressEnter={this.handleReplyto}
                onFocus={this.inputOnFocus}
                onBlur={this.inputOnBlur}
              />
              <Button type="primary" onClick={this.handleReplyto}>回复</Button>
            </div>
          </div>
        }
      >
        {
          comment.children && comment.children.length>0 ? 
          comment.children.map(item => {
            return <Comment
              key={item._id}
              author={<span><a href={'/user/'+item.user._id} target="_blank" rel="noopener noreferrer">{item.user.name}</a> 回复 {item.to.name}</span>}
              avatar={
                <Avatar
                  src={item.user.avatar}
                  alt={item.user.name}
                />
              }
              content={
                <div>
                  <p>{comment.content}</p>
                  <div className="reply_to" onClick={this.changeReplytoTDisplay}><MessageOutlined />回复</div>
                  <div className={this.state.replytoTDisplay ? "replyto_show" : "replyto_hidden"}>
                    <TextArea  
                      className="text"
                      autoSize={{ minRows: 1, maxRows: 4 }}
                      placeholder="回复" 
                      value={this.state.replytoText}
                      onChange={this.handleReplytoText}
                      onPressEnter={this.handleReplyto}
                      onFocus={this.inputOnFocus}
                      onBlur={this.inputOnBlur}
                    />
                    <Button type="primary" onClick={this.handleReplyto}>回复</Button>
                  </div>
                </div>
              }
            />
          })
          : ''
        }
      </Comment>
    )
  }
  
}

export default CommentList