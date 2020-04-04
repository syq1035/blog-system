import React from 'react'
import { Avatar, Menu, List } from 'antd'
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

  componentDidMount() {
    this.getUserInfo()
    this.getArticleInfo()
  }

  getUserInfo() {
    let _id = this.props.location.pathname.substring(6)
    axios.get('/user/info', { params: {_id} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            user: res.data.data
          })
        }
      })
  }

  getArticleInfo() {
    let author = this.props.location.pathname.substring(6)
    axios.get('/article/info', { params: {author} })
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
  }

  render() {
    return (
      <div className="home">
        <Header />
        <div className="user-main">
          <div className="user-info">
            <Avatar size={64} src={this.state.user.avatar}/>
            <div className="right">
              <span className="name">{this.state.user.name}</span>
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
                <Menu.Item key="archive">
                  <span>归档</span>
                </Menu.Item>
                <Menu.Item key="collect">
                  <span>收藏</span>
                </Menu.Item>
              </Menu>
            </div>
            <div className="infinite-container">
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
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={'/article/'+item._id} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                      description={item.description}
                    />
                    <div className='list-content' dangerouslySetInnerHTML = {{__html: item.content}} />
                  </List.Item>
                )}
              >
              </List>
            </div>  
          </div>
        </div>
      </div>
    )
  }
}

export default User