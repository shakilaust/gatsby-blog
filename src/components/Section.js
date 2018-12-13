import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Styles from '../utils/styles'

class Section extends React.Component {
  render() {
    return (
      <section
        style={{
          paddingTop: '1em',
          paddingBottom: '1em',
        }}
      >
        <Row style={Styles.row}>
          <Col sm={12}>{this.props.children}</Col>
        </Row>
      </section>
    )
  }
}

export default Section
