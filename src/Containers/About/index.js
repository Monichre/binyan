import React, {Component} from 'react'
import AppStore from '../../Flux/Store/AppStore'
import ReactMarkdown from 'react-markdown'
import Team from './Team'
import './about.scss'

export default class About extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render () {
    const {employees} = AppStore.data
    const { About } = AppStore.data.pages
    console.log(About)
    console.log(this.props)
    console.log(employees)
    return(
      <div className="About">
         <div className="featured_image">
          <img
            src={About.featuredImage.fields.file.url}
            alt={`About page featured photo, sky scraper buidling`}
          />
        </div>
        <div className="main_content content">
          <ReactMarkdown source={About.mainContent} />
        </div>
        <Team employees={employees} />
        <div className="cities_content content">
          <ReactMarkdown source={About.citiesContent} />
        </div>
      </div>
    )
  }
}