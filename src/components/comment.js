import React from 'react'
import { Comment, Avatar } from 'antd'
import { MessageOutlined } from '@ant-design/icons'

class CommentList extends React.Component {
  render() {
    const comment = this.props.info
    return (
      <Comment
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
            <span className="reply_to"><MessageOutlined />回复</span>
          </div>
        }
      >
        {
          comment.children && comment.children.length>0 ? 
          comment.children.map(item => {
            return <Comment
              key={item._id}
              author={<a href={'/user/'+item.user._id} target="_blank" rel="noopener noreferrer">{item.user.name}</a>}
              avatar={
                <Avatar
                  src={item.user.avatar}
                  alt={item.user.name}
                />
              }
              content={
                <div>
                  <p>{item.content}</p>
                  <span className="reply_to"><MessageOutlined />回复</span>
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