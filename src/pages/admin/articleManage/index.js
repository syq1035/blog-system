import React from 'react'
import axios from 'axios'
import { Table, Button } from 'antd'
import momentDate from '../../../utils/index'

class ArticleManage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likeCount: {},
      commentCount: {},
      articles: [],
      pageTotal: 0,
      pageNum: 1,
    }
    this.pagination = {
      pageSize: 8,
      size: 'middle',
      hideOnSinglePage: true,
      onChange: this.changePage,
    }
  }

  columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      render: (text, record) => (
        <span>
          {record.author.name}
        </span>
      )
    },
    {
      title: '浏览量',
      dataIndex: 'viewCount',
      key: 'viewCount',
    },
    {
      title: '点赞数',
      dataIndex: 'likeCount',
      key: 'likeCount',
      render: (text, record) => (
        <span>
          {this.state.likeCount[record._id] || 0}
        </span>
      )
    },
    {
      title: '评论数',
      dataIndex: 'commentCount',
      key: 'commentCount',
      render: (text, record) => (
        <span>
          {this.state.commentCount[record._id] || 0}
        </span>
      )
    },
    {
      title: '发布时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (text) => (
        <span>
          {momentDate(text)}
        </span>
      )
    },
    {
      title: '操作',
      dataIndex: 'op',
      key: 'op',
      render: (text, record) => (
        <span>
          <Button type="primary" shape="round" danger onClick={this.delete.bind(this, record._id)}>删除</Button>
        </span>
      )
    }
  ]

  componentDidMount() {
    this.getArticlesList()
    this.getLikeCount()
    this.getCommentCount()
  }

  changePage = (page) => {
    this.setState({
      pageNum: page
    }, () => {
      this.getArticlesList();
    })
  }

  getArticlesList = () => {
    let pageSize = this.pagination.pageSize
    let pageNum = this.state.pageNum
    axios.get('/article/list', { params: {pageSize, pageNum} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            articles: res.data.data.articles,
            pageTotal: res.data.data.total
          })
        }
      })
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

  delete = (_id) => {
    axios.delete('/article/delete', { params: {_id} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.getArticlesList()
        }
      })
  }

  render () {
    return (
      <div className="admin-main">
        <div className="title">
          <span>文章管理</span>
        </div>
        <Table 
          columns={this.columns} 
          rowKey="_id"
          dataSource={this.state.articles}
          pagination={{
            ...this.pagination,
            current: this.state.pageNum,
            total: this.state.pageTotal
          }}
        />
      </div>
    )
  }
}

export default ArticleManage