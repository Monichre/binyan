import React, { Component } from 'react'
import AppStore from '../../Flux/Store/AppStore'
import Carousel from '../../Components/Carousel'
import {ProjectPreview} from '../Projects/ProjectPreview'
import Axe from 'axe-core'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
import {CONSTANTS} from '../../constants'
import './home.scss'

console.log(Axe)

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    Axe.run((err, results) => {
      if (err) {
        console.log(err)
        throw err;
      }   
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      // CONSTANTS.complianceReport(results)
    })
  }

  render() {
    const { heroImages, projects, pages } = AppStore.data
    const { companyTagline } = pages.Home
    console.log(heroImages)
    const featuredProjects = _.filter(projects, project => project.featured)
    console.log(featuredProjects)

    return (
      <div className="Home">
        <Carousel slides={heroImages} />
        <section className="section">
          <ReactMarkdown source={companyTagline} className="company_tagline" />
          <div className="featured_projects clearfix">
            {featuredProjects.map(project => (
              <ProjectPreview project={project} />
            ))}
          </div>
        </section>
      </div>
    )
  }
}
