import React from 'react'
import '../../styles/index.scss'

export default props => (
  <div>
    <h4>Social</h4>
    <ul className="unorderedList">
      <li className="inlineListItem">
        <a href="#">
          <i
            className="fa fa-github"
            style={{
              marginRight: '0.5rem',
            }}
          />
          Github
        </a>
      </li>
      <li className="inlineListItem">
        <a href="#">
          <i
            className="fa fa-twitter"
            style={{
              marginRight: '0.5rem',
            }}
          />
          Twitter
        </a>
      </li>
      <li className="inlineListItem">
        <a href="#">
          <i
            className="fa fa-linkedin"
            style={{
              marginRight: '0.5rem',
            }}
          />
          LinkedIn
        </a>
      </li>
    </ul>
  </div>
)
