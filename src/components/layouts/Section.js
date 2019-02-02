import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import '../../styles/index.scss'

class Section extends React.Component {
  render() {
    return (
      <div
        style={{
          paddingTop: '1em',
          paddingBottom: '1em',
          minHeight: '300px',
        }}
      >
        <div className="layoutRow">
          <Col sm={12}>{this.props.children}</Col>
        </div>
      </div>
    )
  }
}

export default Section
