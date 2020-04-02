import React from 'react'
import Header from '../../components/header'
import ArticleDetail from '../../components/articleDetail'
class Detail extends React.Component {
  
  render () {
    return (
      <div className="detail">
        <Header />
        <ArticleDetail />
      </div>
    )
  }
}

export default Detail