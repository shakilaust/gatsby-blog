import React from 'react'
import '../../styles/widgets.scss'
export default props => (
  <div className="AboutBlogWidget">
    <p>Hi, I am Meha, a full stack software engineer based in Dhaka.</p>
    <p>
      "Learning in Public" is my personal blog to share things I learn every
      day. I beleive it might be helpful to someone out there to learn
      something. If you find any inconsistency feel free to{' '}
      <a
        href="https://github.com/mehamasum/gatsby-blog"
        target="_blank"
        style={{ color: '#fff', textDecoration: 'underline' }}
      >
        send a PR
      </a>
      {'  :)'}
    </p>
  </div>
)
