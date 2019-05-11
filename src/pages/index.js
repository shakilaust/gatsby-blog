import React from 'react'
import { Link, graphql } from 'gatsby'
import { Row, Col } from 'react-bootstrap'
import SEO from '../components/seo/SEO'
import Navbar from '../components/layouts/Navbar'

import avatar from '../assets/images/avatar.jpg'
import '../styles/portfolio.scss'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const projects = data.allProjectsJson.edges
      .map(p => p.node)
      .filter(p => p.type !== 'kid' && p.type === 'personal')

    return (
      <React.Fragment>
        <SEO
          article={false}
          title={`Meha Masum's Resume`}
          desc={`Mehedi Hasan Masum's profile, software portfolio and personal blog`}
          pathname={this.props.location.pathname}
        />

        <Navbar location={this.props.location} />

        <main className="indexRoot container">
          <Row>
            <Col xs={12} md={3} mdOffset={1}>
              <section className="resume-section">
                <div className="avatar-wrapper" aria-hidden="true">
                  <img
                    alt="Mehedi Hasan Masum's avatar"
                    src={avatar}
                    className="avatar"
                  />
                </div>

                <h1
                  style={{
                    fontSize: '2.5em',
                    textTransform: 'none',
                    marginBottom: '0.25em',
                  }}
                >
                  Mehedi Hasan Masum
                </h1>

                <div>
                  <span
                    style={{
                      fontSize: '1.1em',
                    }}
                  >
                    {'Software Engineer at '}
                    <a href="http://codemarshal.com">CodeMarshal</a>
                  </span>
                </div>

                <div style={{ margin: '2em 0' }}>
                  <div aria-hidden="true">
                    <i
                      aria-hidden="true"
                      className="fa left-icon fa-map-marker"
                    />
                    <span>Dhaka, Bangladesh</span>
                  </div>

                  <div aria-hidden="true">
                    <a href="tel:+8801521112085" title="Make a phone call">
                      <i aria-hidden="true" className="fa left-icon fa-phone" />
                      +880 152 111 20 85
                    </a>
                  </div>

                  <div aria-hidden="true">
                    <a
                      href="#"
                      className="cryptedmail"
                      onClick={() => {
                        window.location.href = 'mailto:mehamasum@gmail.com'
                        return false
                      }}
                      title="Send email"
                    >
                      <i
                        aria-hidden="true"
                        className="fa left-icon fa-envelope"
                      />
                    </a>
                  </div>
                </div>

                <div style={{ margin: '2em 0 1em 0' }}>
                  <a
                    href="https://stackoverflow.com/users/4135289/mehamasum"
                    title="StackOverflow profile"
                  >
                    <i
                      aria-hidden="true"
                      className="fa social fa-stack-overflow"
                    />
                  </a>

                  <a href="https://github.com/mehamasum" title="Github profile">
                    <i aria-hidden="true" className="fa social fa-github" />
                  </a>

                  <a
                    href="https://linkedin.com/in/mehamasum"
                    title="LinkedIn profile"
                  >
                    <i aria-hidden="true" className="fa social fa-linkedin" />
                  </a>
                </div>
              </section>
            </Col>
            <Col xs={12} md={7}>
              <section className="resume-section">
                <p style={{ fontStyle: 'italic' }}>
                  Programmer and lifelong learner.
                  <br />
                  Led my team to 5 international hackathon titles back in
                  college.
                  <br />
                  Love AI and open source. Believer of ‘Roll up your sleeves and
                  get it done’.
                  <br />
                </p>

                <div className="bio-section">
                  <div>
                    <div className="preference-label">
                      <span>I want to work with</span>
                    </div>
                    <div>
                      <span className="post-tag">python</span>
                      <span className="post-tag">rest</span>
                      <span className="post-tag">graphql</span>
                      <span className="post-tag">node.js</span>
                      <span className="post-tag">react</span>
                    </div>

                    <div className="dislike">
                      <div className="preference-label">
                        <span>I prefer not to work with</span>
                      </div>
                      <div>
                        <span className="post-tag disliked-tag">android</span>
                        <span className="post-tag disliked-tag">jquery</span>
                      </div>
                    </div>
                  </div>

                  <div className="bio-section">
                    <div>
                      <div className="preference-label">
                        <span>My interests</span>
                      </div>
                      <div>
                        <span className="post-tag interest-tag">salad</span>
                        <span className="post-tag interest-tag">workout</span>
                        <span className="post-tag interest-tag">pop music</span>
                        <span className="post-tag interest-tag">tv series</span>
                        <span className="post-tag interest-tag">travel</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <hr />

              <section className="resume-section">
                <h1>Work</h1>
                <article>
                  <header>
                    <h1>Software Engineer</h1>
                    <span>
                      <a href="http://codemarshal.com">CodeMarshal</a>
                    </span>
                    <span>
                      <address>Dhaka, Bangladesh</address>
                      <time>Since Feb 2018</time>
                    </span>
                  </header>
                  <section>
                    Front- and back-end engineering work on{' '}
                    <a href="http://demo.ronangon.com">Ronangon</a> platform.
                    Developed a web based gaming environment with ReactJS, Redux
                    and PixiJS. Implemented messaging backend from scratch with
                    Django, Django-channels.
                  </section>

                  <footer>
                    <div>
                      <span className="post-tag">django-rest-framework</span>
                      <span className="post-tag">django-channels</span>
                      <span className="post-tag">react</span>
                      <span className="post-tag">redux</span>
                      <span className="post-tag">pixi</span>
                      <span className="post-tag">postgresql</span>
                    </div>
                  </footer>
                </article>
                <article>
                  <header>
                    <h1>Research Assistant</h1>
                    <span>
                      <a href="http://cse.du.ac.bd/robolab">
                        Robotics Lab, CSE, DU
                      </a>
                    </span>
                    <span>
                      <address>Dhaka, Bangladesh</address>
                      <time>July 2015 to July 2018</time>
                    </span>
                  </header>
                  <section>
                    Front- and back-end engineering and Machine Learning R&D for{' '}
                    <a href="https://github.com/RoboPi-CSEDU/rupai">Rupai</a>, a
                    graphically programmable robotics kit, funded by Ministry of
                    Education, Govt. of Bangladesh.
                  </section>
                  <footer>
                    <div>
                      <span className="post-tag">python2</span>
                      <span className="post-tag">opencv</span>
                      <span className="post-tag">numpy</span>
                      <span className="post-tag">image-processing</span>
                      <span className="post-tag">blockly</span>
                      <span className="post-tag">php</span>
                    </div>
                  </footer>
                </article>
              </section>

              <section className="resume-section">
                <h1>Education</h1>
                <article>
                  <header>
                    <h1>BSc in Computer Science</h1>
                    <span>
                      <a href="http://www.cse.du.ac.bd/">University of Dhaka</a>
                    </span>
                    <span>
                      <address>Dhaka, Bangladesh</address>
                      <time>Batch of 2018</time>
                    </span>
                  </header>
                  <section>
                    <strong>CGPA</strong>
                    <span>3.81 / 4.0</span> <br />
                    <strong>Thesis</strong>
                    <span>
                      M. H. Masum, T. S. Rifat, S. M. Tareeq, H. Heickal,{' '}
                      <a href="https://dl.acm.org/citation.cfm?id=3290535">
                        A Framework for Developing Graphically Programmable
                        Low-cost Robotics Kit for Classroom Education.
                      </a>
                    </span>
                    <br />
                    <ul>
                      <li>
                        Represented University of Dhaka in{' '}
                        <a href="https://icpc.baylor.edu/regionals/finder/dhaka-2015">
                          2015 ACM-ICPC Asia Dhaka
                        </a>{' '}
                        On Site Regional Contest (Team: DU_Introspection).
                      </li>
                      <li>
                        University scholarship for academic excellence in 2014
                      </li>
                      <li>
                        National Education Board scholarship for 2013 Higher
                        Secondary School Certificate result.
                      </li>
                    </ul>
                  </section>
                </article>
              </section>

              <section className="resume-section">
                <h1>Projects</h1>
                <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {projects.map((project, index) => {
                    return (
                      <Col
                        key={project.hash}
                        xs={12}
                        md={6}
                        style={{ paddingLeft: 0, flex: '1 1 auto' }}
                      >
                        <article key={project.id}>
                          <header>
                            <h1>
                              <a
                                href={project.url[0].url}
                                target="_blank"
                                rel="noopener"
                                title={project.url[0].title}
                              >
                                {project.name}
                              </a>
                            </h1>
                            {project.winner ? (
                              <span>
                                <i
                                  aria-hidden="true"
                                  className="fa left-icon fa-trophy"
                                  style={{
                                    color: '#ffca22',
                                  }}
                                />
                                <span>{`${project.winner.platform}`}</span>
                              </span>
                            ) : null}
                            <span>
                              <time>{project.year}</time>
                            </span>
                          </header>
                          <section>
                            {project.description}

                            <div style={{ marginTop: '0.5em' }}>
                              {project.tags.map((tag, index) => (
                                <span
                                  key={`${project.name}${index}`}
                                  className="post-tag"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </section>
                        </article>
                      </Col>
                    )
                  })}
                </Row>
              </section>
            </Col>
          </Row>
        </main>

        <footer>
          <small style={{ float: 'right', margin: 16 }}>
            {'Layout inspired by '}
            <a
              href="https://resume.joaomoreno.com/"
              title="João Moreno's website"
              target="_blank"
              rel="noreferrer"
            >
              João Moreno
            </a>
          </small>
        </footer>
      </React.Fragment>
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
          hash
          name
          type
          year
          url {
            title
            url
          }
          description
          thumbnail
          winner {
            platform
            title
          }
          tags
        }
      }
    }
  }
`
