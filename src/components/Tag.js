import React, {Component} from 'react';
import { rhythm } from '../utils/typography'

class Tag extends React.Component {
    render() {
        return (
            <a
              style={{
                padding: rhythm(1/4),
                backgroundColor: "grey",
                color: "white",
                marginLeft: rhythm(1/4),
              }}
              href={`/blog/tags/${this.props.tag}`}
            >
              {this.props.tag}
            </a>
          )
    }
}

export default Tag