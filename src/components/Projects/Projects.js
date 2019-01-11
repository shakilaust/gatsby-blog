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
import ReactTooltip from 'react-tooltip'

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
        <ReactTooltip place="top" type="dark" effect="solid" />
        <Collapse onChange={this.onChange} activeKey={this.state.activeKey}>
          {Object.keys(catCount)
            .reverse()
            .map((key, index) => {
              const projects = catCount[key]
              return (
                <Panel header={`${key} (${projects.length})`} key={key}>
                  <Row>
                    {projects.map(project => {
                      return (
                        <Col
                          xs={12}
                          sm={6}
                          md={4}
                          key={project.id}
                          className="project-column"
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
                                    className="project-thumb"
                                  />
                                </a>
                              </div>
                              <div>
                                <section className="project-desc">
                                  <header>
                                    <h3 className="project-header">
                                      <a
                                        href={project.url[0].url}
                                        target="_blank"
                                      >
                                        {project.name}
                                      </a>

                                      <ul className="unorderedList project-urls">
                                        {project.url.map((url, index) => (
                                          <li
                                            key={index}
                                            className="inlineListItem"
                                          >
                                            <a
                                              href={url.url}
                                              target="_blank"
                                              data-tip={url.title}
                                            >
                                              {getIcon(url.title)}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
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
