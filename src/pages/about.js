import React from 'react'
import { Link, graphql } from 'gatsby'
import { Grid, Row, Col } from 'react-bootstrap'
import '../styles/index.scss'
import '../styles/card.scss'
import '../styles/about.scss'
import Layout from '../components/layouts/Layout'
import SEO from '../components/seo/SEO'

import { StaticQuery } from 'gatsby'
import Tag from '../components/Tag/Tag'

const Hackathons = () => (
  <StaticQuery
    query={graphql`
      {
        allProjectsJson {
          edges {
            node {
              id
              name
              hash
              year
              url {
                title
                url
              }
              winner {
                title
                platform
              }
            }
          }
        }
      }
    `}
    render={data => {
      const projects = data.allProjectsJson.edges
        .map(p => p.node)
        .filter(p => p.winner)
        .map(p => (
          <li key={p.id} style={{ marginBottom: '1rem' }}>
            <span>{p.winner.platform}</span>
            <br />
            <span>
              <em>{`${p.winner.title}`}</em>&nbsp;{'|'}&nbsp;
              <Link to={`/#${p.hash}`} style={{ textDecoration: 'none' }}>
                {p.name}
              </Link>
            </span>

            <div className="date">{p.year}</div>
          </li>
        ))
      return projects
    }}
  />
)

class About extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO
          article={false}
          title={`About Meha Masum`}
          desc={`Mehedi Hasan Masum's profile, software portfoilo and personal blog`}
          pathname={this.props.location.pathname}
        />
        <div className="card">
          <Row>
            <Col xs={12}>
              <p style={{ textAlign: 'center', padding: '3rem 3rem' }}>
                Programmer and fresh undergrad. Led my team to 5 international
                hackathon titles. Love AI and open source. <br />
                Believer of ‘Roll up your sleeves and get it done’.
              </p>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <div className="bio-section">
                <h3>
                  <i className="fa fa-briefcase" /> Experience
                </h3>
                <div>
                  <div>
                    <div className="card card-content card-light">
                      <div>
                        <span>
                          <strong>Software Engineer, </strong>
                          <a
                            href="http://codemarshal.com"
                            className="tip2"
                            data-toggle="tooltip"
                            title="Official Website"
                          >
                            <span>CodeMarshal </span>
                          </a>
                          (former Mukto Soft)
                          <br />
                          <div className="date">Feb 2018 - Present</div>
                        </span>
                        <p>
                          Wroking as a Full Stack engineer in building robust
                          SPAs
                        </p>
                        <div>
                          <i className="fa fa-wrench" />
                          <Tag
                            tag="React"
                            url="https://reactjs.org/"
                            external
                          />
                          <Tag
                            tag="Redux"
                            url="https://redux.js.org/"
                            external
                          />
                          <Tag
                            tag="Django"
                            url="https://www.djangoproject.com/"
                            external
                          />
                          <Tag
                            tag="DRF"
                            url="https://www.django-rest-framework.org/"
                            external
                          />
                          <Tag
                            tag="PostgreSQL"
                            url="https://www.postgresql.org/"
                            external
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card card-content card-light">
                      <div>
                        <span>
                          <strong>Research Assistant, </strong>
                          <a
                            href="http://cse.du.ac.bd/robolab"
                            className="tip2"
                            data-toggle="tooltip"
                            title="Official Website"
                          >
                            <span>Robotics Lab, CSE, DU</span>
                          </a>
                          <br />
                          <div className="date">July 2015 - July 2018</div>
                        </span>
                        <ul>
                          <li>
                            Developed Low Cost Robotic kit and Graphical
                            Programming Language for School Students{' '}
                            <Link to="/#rupai">(Project: Rupai)</Link>
                          </li>
                          <li>
                            Funded by Ministry of Education, Govt. of Bangladesh
                          </li>
                          <li>
                            Published the work in{' '}
                            <a href="http://www.icetc.org" target="_blank">
                              ICETC 2018
                            </a>
                          </li>
                        </ul>
                        <div>
                          <i className="fa fa-wrench" />
                          <Tag
                            tag="Python 2.7"
                            url="https://www.python.org/"
                            external
                          />
                          <Tag
                            tag="Google Blockly"
                            url="https://developers.google.com/blockly/"
                            external
                          />
                          <Tag
                            tag="OpenCV"
                            url="https://opencv.org/"
                            external
                          />
                          <Tag
                            tag="Vanilla JS"
                            url="http://vanilla-js.com/"
                            external
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bio-section">
                <h3>
                  <i className="fa fa-graduation-cap" /> Education
                </h3>
                <div>
                  <div>
                    <div className="card card-content card-light">
                      <div>
                        <span>
                          <strong>Dept. of CSE, University of Dhaka</strong>
                          <div className="date">Batch of 2018</div>
                        </span>
                        <ul>
                          <li>
                            Bachelor of Science in Computer Science &
                            Engineering
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bio-section">
                <h3>
                  <i className="fa fa-trophy" /> Honors
                </h3>
                <div>
                  <div>
                    <div className="card card-content card-light">
                      <div>
                        <span>
                          <strong>Competitive Programming</strong>
                        </span>
                        <ul>
                          <li>
                            <span>Represented University of Dhaka in </span>
                            <a
                              href="https://icpc.baylor.edu/regionals/finder/dhaka-2015"
                              target="_blank"
                            >
                              ACM-ICPC Asia Dhaka On Site Regional Contest
                              (DU_Introspection)
                            </a>
                            <div className="date">2015</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card card-content card-light">
                      <div>
                        <span>
                          <strong>Software Competition</strong>
                        </span>
                        <ul>
                          <Hackathons />
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>{' '}
      </Layout>
    )
  }
}

export default About
