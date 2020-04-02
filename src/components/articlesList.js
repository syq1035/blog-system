import React from 'react'
import { List, message, Spin, Avatar } from 'antd'
import { MessageOutlined, LikeOutlined, EyeOutlined } from '@ant-design/icons'
import InfiniteScroll from 'react-infinite-scroller'
import axios from 'axios'

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
)

class ArticlesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: false,
      hasMore: true,
      pageNum: 1,
      total: 0
    }
  }

  componentDidMount() {
    this.getArticlesList()
  }

  getArticlesList = () => {
    let pageSize = 8
    let pageNum = this.state.pageNum
    axios.get('/article/list', { params: {pageSize, pageNum} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          let { articles } = this.state;
          articles = articles.concat(res.data.data.articles);
          this.setState({
            articles: articles,
            total: res.data.data.total,
            loading: false
          })
        }
      })
  }

  handleInfiniteOnLoad = () => {
    let { articles } = this.state;
    this.setState({
      loading: true,
    })
    if (articles.length >= this.state.total) {
      message.warning('没有更多了');
      this.setState({
        hasMore: false,
        loading: false,
      })
      return
    }
    this.setState({
      pageNum: this.state.pageNum + 1
    },() => {
      this.getArticlesList();
    })
  }

  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
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
                  title={<a href={'http://localhost:3000/article/'+item._id} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                  description={item.description}
                />
                <div className='list-content' dangerouslySetInnerHTML = {{__html: item.content}} />
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
        {
        //   this.state.hasMore ? null : <span>没有更多了~</span>
        }
      </div>
    );
  }
}

export default ArticlesList