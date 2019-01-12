import React, { Component } from 'react'
import '../../styles/index.scss'
import '../../styles/card.scss'
import '../../styles/projects.scss'
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
      return <i className="icon fa fa-github" />
    case 'Website':
      return <i className="icon fa fa-external-link" />
    case 'Publication':
      return <i className="icon fa fa-book" />
    default:
      return <i className="icon fa fa-link" />
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
      .filter(p => p.type !== 'kid')
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
                  <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {projects.map(project => {
                      return (
                        <Col
                          xs={12}
                          sm={6}
                          md={4}
                          key={project.id}
                          className="project-column"
                          style={{
                            display: 'flex',
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
                              style={{
                                flex: '1 1 auto',
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <a href={project.url[0].url} target="_blank">
                                <img
                                  src={
                                    project.thumbnail ||
                                    'https://picsum.photos/400/300/?random'
                                  }
                                  alt={project.name}
                                  className="project-thumb"
                                />
                              </a>
                              <section
                                className="project-desc"
                                style={{ flex: '1 1 auto' }}
                              >
                                <header>
                                  <h3 className="project-header">
                                    <a
                                      href={project.url[0].url}
                                      target="_blank"
                                    >
                                      {project.name}
                                    </a>

                                    <span
                                      style={{
                                        fontSize: '0.7em',
                                        background:
                                          project.type === 'personal'
                                            ? '#337ab7'
                                            : '#5cb85c',
                                        float: 'right',
                                      }}
                                      className="boot-label"
                                    >
                                      {project.type}
                                    </span>
                                  </h3>
                                </header>

                                {project.winner ? (
                                  <div className="winner-container">
                                    <i className="fa fa-trophy trophy winner-icon" />
                                    <p className="winner-text">{`${
                                      project.winner.platform
                                    }`}</p>
                                  </div>
                                ) : null}

                                <p>{project.description}</p>
                              </section>

                              <footer className="project-desc">
                                <div>
                                  <i className="fa fa-wrench" />
                                  {project.tags.map((tag, index) => (
                                    <Tag tag={tag} key={index} url="#" />
                                  ))}
                                </div>
                                <h4>
                                  <ul className="unorderedList project-urls">
                                    {project.url.map((url, index) => (
                                      <li
                                        key={index}
                                        className="inlineListItem"
                                      >
                                        <a href={url.url} target="_blank">
                                          {url.title}

                                          {getIcon(url.title)}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </h4>
                              </footer>
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
