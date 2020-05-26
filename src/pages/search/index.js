import React from 'react'
import axios from 'axios'
import { Avatar, List, } from 'antd'
import { MessageOutlined, LikeOutlined, EyeOutlined } from '@ant-design/icons'
import Header from '../../components/header'
import IconText from '../../components/IconText'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: []
    }
    this.search =  this.props.location.state
  }

  componentDidMount() {
    this.getArticleList(this.search)
  }

  getArticleList = (obj) => {
    axios.get('/article/search', {params: obj})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            articles: res.data.data
          })
        }
      })
  }
  render() {
    return (
      <div className="home">
        <Header />
        <div className="search-main">
          <div className="container">
            {
              this.state.articles.length === 0 ? '没有搜索到相关文章，搜索其它的试试吧'
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
    )
  }
}

export default Search