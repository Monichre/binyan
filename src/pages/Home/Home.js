import React, { Component } from 'react'
import AppStore from '../../Flux/Store/AppStore'
import { Link } from 'react-router-dom'
import Carousel from '../../components/carousel/Carousel'
import { ProjectPreview } from '../Projects/ProjectPreview'
import Axe from 'axe-core'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
import {CONSTANTS} from '../../constants'
import './home.scss'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  render() {
    const { heroImages, projects, pages, siteNav, featuredProjects } = AppStore.data
    const { companyTagline } = pages.Home
    
    const navStyles = {
      display: ' flex',
      margin: ' 0',
      justifyContent: ' space-evenly',
      padding: ' 20px 0'
    }
    const homePageLiStyle = {
      color: ' white',
      letterSpacing: ' 3px',
      fontSize: ' 0.8rem',
      paddingTop: ' 10px',
      textTransform: ' uppercase'
    }    
    const HomePageLogo = (
      <li className="logo_item" style={{ flexBasis: '40%' }}>
        <a href="/" className="logo">
          <img
            src="/img/logoWhite.png"
            style={{ display: 'block', margin: 'auto' }}
          />
        </a>
      </li>
    )
    let HomeNav = siteNav.map((item, i) => (
      <li style={homePageLiStyle}>
        <Link key={`${item} + '-'${i}`} to={`/${item}`}>
          {item}
        </Link>
      </li>
    ))

    const middle = Math.floor(siteNav.length / 2)
    HomeNav.splice(middle, 0, HomePageLogo)
    
    const HomePageHeader = () => (
      <header className="header home_page_header">
        <ul style={navStyles} >{HomeNav}</ul>
      </header>
    )
    

    return (
      <div className="Home">
        <HomePageHeader />
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
