import React from 'react'
import { Link, graphql } from 'gatsby'
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'
import SEO from '../components/seo/SEO'
import avatar from '../assets/images/avatar-alt.jpg'
import Tag from '../components/Tag/Tag'

class Index extends React.Component {
  render() {
    const { data } = this.props
    console.log(data)
    const projects = data.allProjectsJson.edges
      .map(p => p.node)
      .filter(p => p.type !== 'kid' && p.type === 'personal')

    return (
      <React.Fragment>
        <SEO
          article={false}
          title={`Meha Masum's software portfolio`}
          desc={`Mehedi Hasan Masum's profile, software portfolio and personal blog`}
          pathname={this.props.location.pathname}
        />

        <Container className="indexRoot">
          <Row>
            <Col xs={12} md={3}>
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
                <a href="mailto:mehamasum@gmail.com">mehamasum@gmail.com</a>
              </p>
            </Col>
            <Col xs={12} md={9}>
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
                    Developed a web based gaming environment with ReactJS, Redux
                    and PixiJS. Implemented messaging backend from scratch with
                    Django, Django-channels.
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
                    Front- and back-end engineering and Machine Learning R&D for{' '}
                    <a href="https://github.com/RoboPi-CSEDU/rupai">Rupai</a>, a
                    graphically programmable robotics kit, funded by Ministry of
                    Education, Govt. of Bangladesh.
                  </section>
                </article>
              </section>

              <section>
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
                      <a href="http://icetc.org">
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
                        xs={6}
                        md={6}
                        style={{ padding: 0, flex: '1 1 auto' }}
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
                                  style={{
                                    fontSize: '85%',
                                    verticalAlign: 'baseline',
                                    background: '#eee',
                                    marginRight: '0.5rem',
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
        </Container>
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
