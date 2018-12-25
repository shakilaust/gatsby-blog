import React from 'react'
import '../../styles/index.scss'
import { Link } from '@reach/router'

export default props => (
  <div>
    <h4>RSS</h4>
    <ul className="unorderedList">
      <li className="inlineListItem">
        <Link to="/rss.xml">
          <i
            className="fa fa-rss"
            style={{
              marginRight: '0.5rem',
            }}
          />
          All Posts
        </Link>
      </li>
    </ul>
  </div>
)
