import React from 'react'
import { Modal, Button } from 'antd'
class Publish extends React.Component {

  handlePublish = () => {
    this.props.publish()
  }
  render() {
    return (
      <Modal
        title="发布文章"
        visible={this.props.publishModal}
        onCancel={this.props.close}
        centered
        width={360}
        footer={null}
      >
      <Button className="publish-btn" type="primary" onClick={this.handlePublish}>确认发布</Button>
      
      </Modal>
    )
  }
}

export default Publish