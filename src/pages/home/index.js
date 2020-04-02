import React from 'react'
import { Menu } from 'antd'
import Header from '../../components/header'
import ArticlesList from '../../components/articlesList'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: 'all'
    }
  }

  handleMenu = ({key}) => {
    this.setState({
      sort: key
    })
  }

  render () {
    return (
      <div className="home">
        <Header />
        <div className="home-main">
          <div className="header-list">
            <Menu
              mode="horizontal"
              selectedKeys={[this.state.sort]}
              onClick={this.handleMenu}
            >
              <Menu.Item key="all">
                <span>全部</span>
              </Menu.Item>
              <Menu.Item key="newest">
                <span>最新</span>
              </Menu.Item>
              <Menu.Item key="hottest">
                <span>热榜</span>
              </Menu.Item>
            </Menu>
          </div>
          <ArticlesList />
        </div>
        
      </div>
    )
  }
}

export default Home