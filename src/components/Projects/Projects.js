import React, { Component } from 'react'
import '../../styles/index.scss'
import '../../styles/card.scss'
import 'rc-collapse/assets/index.css'
import Collapse, { Panel } from 'rc-collapse'
import { Grid, Row, Col } from 'react-bootstrap'
import Tag from '../../components/Tag/Tag'
import ScrollableAnchor, {
  configureAnchors,
} from '../lib/react-scrollable-anchor'

const getIcon = urlType => {
  switch (urlType) {
    case 'Github':
      return <i className="fa fa-github" />
    case 'Website':
      return <i className="fa fa-external-link" />
    case 'Publication':
      return <i className="fa fa-book" />
    default:
      return <i className="fa fa-link" />
  }
}

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: ['2016', '2017', '2018'],
    }
    configureAnchors({
      scrollUrlHashUpdate: false,
    })
  }

  onChange = activeKey => {
    this.setState({
      activeKey,
    })
  }

  shouldHighlight(highlightedHash, projectHash) {
    return highlightedHash.split('#')[1] === projectHash
  }

  render() {
    const { data } = this.props
    const projects = data.allProjectsJson.edges
      .map(p => p.node)
      .filter(p => !p.kid)
    let catCount = {}
    projects.forEach(post => {
      const cat = post.year
      if (!catCount[cat]) catCount[cat] = []
      catCount[cat].push(post)
    })

    return (
      <div>
        <Collapse onChange={this.onChange} activeKey={this.state.activeKey}>
          {Object.keys(catCount)
            .reverse()
            .map((key, index) => {
              const projects = catCount[key]
              return (
                <Panel header={`${key} (${projects.length})`} key={key}>
                  <Row className="row-eq-height">
                    {projects.map(project => {
                      return (
                        <Col
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          key={project.id}
                          style={{
                            paddingLeft: '0.75em',
                            paddingRight: '0.75em',
                            margin: 0,
                          }}
                        >
                          <ScrollableAnchor id={project.hash}>
                            <div
                              className={
                                this.shouldHighlight(
                                  this.props.hash,
                                  project.hash
                                )
                                  ? 'card highlighted'
                                  : 'card'
                              }
                            >
                              {/* project.winner ? (
                              <aside
                                style={{
                                  position: 'absolute',
                                  zIndex: 1,
                                  width: '100%',
                                }}
                              >
                                <img
                                  alt="Winner"
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                  }}
                                  src={ribbon}
                                />
                              </aside>
                                ) : null */}

                              <div
                                style={{
                                  position: 'relative',
                                }}
                              >
                                <a href={project.url[0].url} target="_blank">
                                  <img
                                    src={
                                      project.thumbnail ||
                                      'https://picsum.photos/400/300/?random'
                                    }
                                    alt={project.name}
                                    style={{
                                      width: '100%',
                                      borderRadius: '5px 5px 0 0',
                                    }}
                                  />
                                </a>

                                <header
                                  style={{
                                    width: '100%',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    padding: '0.5em 1em 0.5em 1em',
                                    paddingTop: '40px',
                                    background:
                                      'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
                                  }}
                                >
                                  <h3
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                      textDecoration: 'none',
                                      color: '#fff',
                                    }}
                                  >
                                    <a
                                      href={project.url[0].url}
                                      target="_blank"
                                      style={{
                                        color: '#fff',
                                      }}
                                    >
                                      {project.name}
                                    </a>

                                    <ul
                                      className="unorderedList"
                                      style={{
                                        height: '2rem',
                                        float: 'right',
                                      }}
                                    >
                                      {project.url.map((url, index) => (
                                        <li
                                          key={index}
                                          className="inlineListItem"
                                        >
                                          <a
                                            href={url.url}
                                            target="_blank"
                                            style={{
                                              color: '#fff',
                                            }}
                                          >
                                            {getIcon(url.title)}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </h3>
                                </header>
                              </div>
                              <div>
                                <section
                                  style={{
                                    padding: '1em',
                                  }}
                                >
                                  {project.winner ? (
                                    <div
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <i
                                        className="fa fa-trophy trophy"
                                        style={{
                                          marginRight: '0.5rem',
                                          flex: '0 0 auto',
                                          fontSize: '2rem',
                                        }}
                                      />
                                      <p
                                        style={{
                                          fontSize: '1.2rem',
                                          fontWeight: 700,
                                        }}
                                      >{`${project.winner.platform}`}</p>
                                    </div>
                                  ) : null}

                                  <p>{project.description}</p>

                                  <div>
                                    <i className="fa fa-wrench" />
                                    {project.tags.map((tag, index) => (
                                      <Tag tag={tag} key={index} url="#" />
                                    ))}
                                  </div>
                                </section>
                              </div>
                            </div>
                          </ScrollableAnchor>
                        </Col>
                      )
                    })}
                  </Row>
                </Panel>
              )
            })}
        </Collapse>
      </div>
    )
  }
}

export default Projects
