import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Grid, Row, Col } from 'react-bootstrap'
import '../assets/bootstrap.min.css'
import '../assets/site.css'
import { rhythm } from '../utils/typography'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const { blogTitle, blogSlogan } = data.site.siteMetadata
    console.log(data)
    const projects = data.allProjectsJson.edges
    return (
      <Grid>
        <Row>
          {projects.map(({ node: project }) => {
            return (
              <Col xs={12} sm={6} md={4} lg={3} key={project.id}>
                <div className="card">
                  <aside className="entry-badge">
                    <img
                      alt="Winner"
                      className="winner"
                      src="https://devpost-challengepost.netdna-ssl.com/assets/shared/software/winner-ribbon-d6a3513950ca29607c8d8682f419dd99.png"
                    />
                  </aside>
                  <img
                    src="https://picsum.photos/400/300/?random"
                    alt="Avatar"
                    style={{ width: '100%' }}
                  />
                  <div className="card-body">
                    <h2
                      style={{
                        marginTop: 0,
                      }}
                    >
                      {project.name}
                    </h2>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s.
                    </p>
                    <a href="#">Website</a> &bull; <a href="#">Github</a>
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
      </Grid>
    )
  }
}

export default Index

export const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        blogTitle
        blogSlogan
      }
    }

    allProjectsJson {
      edges {
        node {
          id
          name
          date
          url
          urlTooltip
          bio
          description
          thumbnail
          tags {
            type
            tag
          }
        }
      }
    }
  }
`
