import React from 'react'
import { Link } from 'gatsby'
import '../../styles/index.scss'

export default props => {
  const { links } = props

  return (
    <ul className="unorderedList" style={{ margin: 0, ...props.style }}>
      {links.slice(0, links.length - 1).map((link, index) => (
        <li className="inlineListItem" key={index}>
          <Link to={link.url}>{link.label}</Link>&nbsp;&nbsp;
          <i className="fa fa-angle-right" />
        </li>
      ))}
      <li className="inlineListItem">{links[links.length - 1].label}</li>
    </ul>
  )
}
