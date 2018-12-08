import React from 'react'
import { Link } from 'gatsby'

export default props => {
  const { previous, next } = props
  return (
    <ul
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        listStyle: 'none',
        padding: 0,
        marginLeft: 0,
        marginTop: '1.5rem',
      }}
    >
      <li>
        {previous && previous.url && (
          <Link to={previous.url} rel="prev">
            ← {previous.label}
          </Link>
        )}
      </li>
      <li>
        {next && next.url && (
          <Link to={next.url} rel="next">
            {next.label} →
          </Link>
        )}
      </li>
    </ul>
  )
}
