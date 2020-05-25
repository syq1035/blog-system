import React from 'react'
import axios from 'axios'
import { Table, Button } from 'antd'
import momentDate from '../../../utils/index'

class CommentManage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
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
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '评论者',
      dataIndex: 'user',
      key: 'user',
      render: (text, record) => (
        <span>
          {record.user.name}
        </span>
      )
    },
    {
      title: '被评论者',
      dataIndex: 'user',
      key: 'user',
      render: (text, record) => (
        <span>
          {record.to? record.to.name : '文章'}
        </span>
      )
    },
    {
      title: '文章',
      dataIndex: 'article',
      key: 'article',
      render: (text, record) => (
        <span>
          {record.article.title}
        </span>
      )
    },
    {
      title: '评论时间',
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
    this.getCommentsList()
  }

  changePage = (page) => {
    this.setState({
      pageNum: page
    }, () => {
      this.getCommentsList();
    })
  }

  getCommentsList = () => {
    let pageSize = this.pagination.pageSize
    let pageNum = this.state.pageNum
    axios.get('/comment/list', { params: {pageSize, pageNum} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            comments: res.data.data.comments,
            pageTotal: res.data.data.total
          })
        }
      })
  }

  delete = (_id) => {
    axios.delete('/comment/delete', { params: {_id} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.getCommentsList()
        }
      })
  }

  render () {
    return (
      <div className="admin-main">
        <div className="title">
          <span>评论管理</span>
        </div>
        <Table 
          columns={this.columns} 
          rowKey="_id"
          dataSource={this.state.comments}
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

export default CommentManage