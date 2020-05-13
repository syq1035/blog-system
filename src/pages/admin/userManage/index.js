import React from 'react'
import axios from 'axios'
import { Table, Button } from 'antd'

class UserManage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
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
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '用户身份',
      dataIndex: 'type',
      key: 'type',
      render: (text) => (
        <span>
          {
            text ? '普通用户' : '管理员'
          }
        </span>
      )
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (text) => (
        <span>
          {text.toString().substring(0, 10)}
        </span>
      )
    },
    {
      title: '操作',
      dataIndex: 'op',
      key: 'op',
      render: (text, record) => (
        <span>
          <Button type="primary" shape="round" danger onClick={this.delete.bind(this, record._id)}>注销</Button>
        </span>
      )
    }
  ]

  componentDidMount() {
    this.getUserList()
  }

  changePage = (page) => {
    
    this.setState({
      pageNum: page
    }, () => {
      this.getUserList();
    })
  }

  getUserList = () => {
    let pageSize = this.pagination.pageSize
    let pageNum = this.state.pageNum
    axios.get('/user/list', { params: {pageSize, pageNum} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            users: res.data.data.users,
            pageTotal: res.data.data.total
          })
        }
      })
  }

  delete = (_id) => {
    axios.delete('/user/delete', { params: {_id} })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.getUserList()
        }
      })
  }

  render () {
    return (
      <div className="admin-main">
        <div className="title">
          <span>用户管理</span>
        </div>
        <Table 
          columns={this.columns} 
          rowKey="_id"
          dataSource={this.state.users}
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

export default UserManage