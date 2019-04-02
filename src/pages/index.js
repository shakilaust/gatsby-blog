import React from 'react'
import { Link, graphql } from 'gatsby'
import { Row, Col } from 'react-bootstrap'
import SEO from '../components/seo/SEO'
import avatar from '../assets/images/avatar.jpg'

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

        <header>
          <Link to="/resume/" className="print">
            <i className="fa fa-print" />
          </Link>
        </header>

        <div>
          <div className="container indexRoot">
            <Row>
              <Col xs={12} md={3} mdOffset={1} style={{ marginBottom: '2em' }}>
                <img
                  alt="Mehedi Hasan Masum's avatar"
                  src={avatar}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                  }}
                />
                <h1 style={{ fontSize: '2.5em' }}>Mehedi Hasan Masum</h1>
                <a href="tel:+8801521112085">+880 152 111 20 85</a>
                <address>Dhaka, Bangladesh</address>
                <p>
                  <a
                    href="#"
                    className="cryptedmail"
                    onClick={() => {
                      window.location.href = 'mailto:mehamasum@gmail.com'
                      return false
                    }}
                  />
                </p>

                <ul
                  style={{
                    listStyleType: 'none',
                    padding: 0,
                  }}
                >
                  <li style={{ marginLeft: 0 }}>
                    <a href="https://stackoverflow.com/users/4135289/mehamasum">
                      <i
                        className="fa fa-stack-overflow"
                        style={{
                          marginRight: '0.5rem',
                        }}
                      />
                      Stackoverflow
                    </a>
                  </li>

                  <li>
                    <a href="https://github.com/mehamasum">
                      <i
                        className="fa fa-github"
                        style={{
                          marginRight: '0.5rem',
                        }}
                      />
                      Github
                    </a>
                  </li>

                  <li>
                    <a href="https://linkedin.com/in/mehamasum">
                      <i
                        className="fa fa-linkedin"
                        style={{
                          marginRight: '0.5rem',
                        }}
                      />
                      LinkedIn
                    </a>
                  </li>
                </ul>

                <br />

                <div>
                  <Link to="/blog">
                    <i
                      className="fa fa-rss"
                      style={{
                        marginRight: '0.5rem',
                      }}
                    />
                    Read Articles
                  </Link>
                </div>
              </Col>
              <Col xs={12} md={7}>
                <section>
                  <p
                    style={{
                      paddingLeft: 15,
                      borderLeft: '3px solid #ccc',
                      fontStyle: 'italic',
                    }}
                  >
                    Programmer <strike>and undergrad student</strike>.<br />
                    Led my team to 5 international hackathon titles in college.
                    <br />
                    Love AI and open source. Believer of ‘Roll up your sleeves
                    and get it done’.
                    <br />
                  </p>
                </section>

                <section>
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
                      Developed a web based gaming environment with ReactJS,
                      Redux and PixiJS. Implemented messaging backend from
                      scratch with Django, Django-channels.
                    </section>
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
                      Front- and back-end engineering and Machine Learning R&D
                      for{' '}
                      <a href="https://github.com/RoboPi-CSEDU/rupai">Rupai</a>,
                      a graphically programmable robotics kit, funded by
                      Ministry of Education, Govt. of Bangladesh.
                    </section>
                  </article>
                </section>

                <section>
                  <h1>Education</h1>
                  <article>
                    <header>
                      <h1>BSc in Computer Science</h1>
                      <span>
                        <a href="http://www.cse.du.ac.bd/">
                          University of Dhaka
                        </a>
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

                <section>
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
                                <a href={project.url[0].url} target="_blank">
                                  {project.name}
                                </a>
                              </h1>
                              {project.winner ? (
                                <span>
                                  <i
                                    className="fa fa-trophy"
                                    style={{
                                      marginRight: '0.5rem',
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
                                    style={{
                                      fontSize: '85%',
                                      verticalAlign: 'baseline',
                                      background: '#eee',
                                      borderColor: '#eee',
                                      marginRight: '0.5rem',
                                      marginBottom: '0.5rem',
                                      borderRadius: '5px',
                                      display: 'inline-block',
                                      padding: '0.2em 0.6em 0.2em 0.6em',
                                    }}
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
          </div>
        </div>

        <footer
          style={{
            padding: 16,
          }}
        >
          <small style={{ float: 'right', margin: 16 }}>
            Layout inspired by{' '}
            <a href="https://resume.joaomoreno.com/">João Moreno</a>
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
