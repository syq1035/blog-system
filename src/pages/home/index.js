import React from 'react'
import Header from '../../components/header'
import Register from './modals/register'
import Login from './modals/login'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      registerModal: false,
      loginModal: false
    }
  }

  showRegisterModal() {
    this.setState({
      ...this.state,
      registerModal: true
    })
  }

  closeRegisterModal() {
    this.setState({
      ...this.state,
      registerModal: false
    })
  }

  showLoginModal() {
    this.setState({
      ...this.state,
      loginModal: true
    })
  }

  closeLoginModal() {
    this.setState({
      ...this.state,
      loginModal: false
    })
  }

  render () {
    return (
      <div className="home">
        <Header 
          showRegisterModal={ this.showRegisterModal.bind(this) } 
          showLoginModal={ this.showLoginModal.bind(this) }
        />
        <p>Home</p>
        <Register 
          registerModal={ this.state.registerModal } 
          close={ this.closeRegisterModal.bind(this) }
        />
        <Login 
          loginModal={ this.state.loginModal }
          close={ this.closeLoginModal.bind(this) }
        />
      </div>
    )
  }
}

export default Home