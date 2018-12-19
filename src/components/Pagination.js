import React from 'react'
import { Link } from 'gatsby'
import '../styles/index.scss'

const renderButton = (context, dir) => {
  if (!context || !context.url)
    return (
      <button className="btn" disabled>
        {context.label}
      </button>
    )
  return (
    <Link to={context.url} rel="prev">
      {dir === 'left' ? (
        <div>
          <i className={`fa fa-angle-${dir}`} />
          &nbsp;
          {context.label}
        </div>
      ) : (
        <div>
          {context.label}
          &nbsp;
          <i className={`fa fa-angle-${dir}`} />
        </div>
      )}
    </Link>
  )
}

export default props => {
  const { previous, next, current, total } = props
  if (current === 1 && total === 1) return null

  return (
    <ul className="unorderedList">
      <li className="inlineListItem">{renderButton(previous, 'left')}</li>
      {current && total && (
        <li className="inlineListItem">{`${current} of ${total}`}</li>
      )}
      <li className="inlineListItem">{renderButton(next, 'right')}</li>
    </ul>
  )
}
