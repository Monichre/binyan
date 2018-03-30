import React, { Component } from 'react'
import AppStore from '../../Flux/Store/AppStore'
import Carousel from '../../Components/Carousel'
import {ProjectPreview} from '../Projects/ProjectPreview'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
import './home.scss'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log(AppStore.data)
    const { heroImages, projects, pages } = AppStore.data
    const { companyTagline } = pages.Home
    console.log(heroImages)
    // const featuredProjects = _.filter(projects, project => project.featured)
    const featuredProjects = projects
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
