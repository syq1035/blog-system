import React from 'react'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { Input, Button, message } from 'antd'
import Publish from '../../components/modals/publish'

class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      publishModal: false
    }
  }
  mdParser = new MarkdownIt()

  handleTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleContent = ({html, text}) => {
    this.setState({
      content: html
    })
  }

  showPublishModal = () => {
    this.setState({
      publishModal: true
    })
  }

  closePublishModal() {
    this.setState({
      publishModal: false
    })
  }

  publish = () => {
    console.log(this.state)
    let { title, content } = this.state
    axios.post('/article/new', { title, content })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          message.success(res.data.message, 1)
          this.closePublishModal()
        }
      })
      .catch(err => {
        console.log(err);
      });
    
  }

  render () {
    return (
      <div className="editor">
        <div className="editor-header">
          <Input placeholder="请输入文章标题" className="editor-title" value={this.state.title} onChange={this.handleTitle} />
          <Button type="primary" shape="round" className="publish" onClick={this.showPublishModal}>
            发布
          </Button>
        </div>
        <div className="editor-main">
          <MdEditor
            value=''
            renderHTML={(text) => this.mdParser.render(text)}
            onChange={this.handleContent}
            config={{
              view: {
                menu: true,
                md: true,
                html: true
              }
            }}
          />
        </div>
        <Publish
          publishModal={this.state.publishModal}
          close={this.closePublishModal.bind(this)}
          publish={this.publish}
        />
        
      </div>
    )
  }
}

export default Editor