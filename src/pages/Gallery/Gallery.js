import React, { Component } from 'react'
import AppDispatcher from '../../Flux/Dispatcher/AppDispatcher'
import {Link} from 'react-router-dom'
import AppStore from '../../Flux/Store/AppStore'
import ReactMarkdown from 'react-markdown'
import ReactPlayer from 'react-player'
import GeneralHeader from '../../components/header/Header'
import './gallery.scss'

export default class Gallery extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const galleryDiv = document.querySelector('.gallery_photo_gallery')
    console.log(galleryDiv)
    // console.log(galleryDiv.style)
    console.log(window.getComputedStyle(galleryDiv))
    const gridItems = document.querySelectorAll('.grid_item')
    const { projects } = AppStore.data
    this.analyzeComponentHeight(galleryDiv, gridItems)
  }

  analyzeComponentHeight = (galleryDiv, gridItems) => {
    const containerHeight = galleryDiv.clientHeight - 100
    let totalElementsHeight = 0
    gridItems.forEach((item) => totalElementsHeight += item.offsetHeight)
    let heights = []
    console.log(containerHeight)
    console.log(totalElementsHeight)
  }

  render() {
    const { projects } = AppStore.data

    const isVideoOrImage = project =>
      project.featuredImage.fields.file.url.includes('mp4') ||
      project.featuredImage.fields.file.url.includes('video') ? (
        <ReactPlayer
          className="gallery_video"
          url={project.featuredImage.fields.file.url}
          playing
          loop={true}
          muted
          height="100%"
          width="100%"
        />
      ) : (
        <img src={project.featuredImage.fields.file.url + '?fl=progressive&w=500&h=800'} alt={project.title + ' ' + project.architect} />
      )

    const shuffle = a => {
      let j
      let x
      let i
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
      }
      return a
    }
    // const gallery = shuffle(projects)

    return (
      <div className="Gallery">
        <GeneralHeader />
        <nav className="gallery_menu">
          <ul>
            <li>All</li>
            <li>Still</li>
            <li>Video</li>
            <li>VR</li>
            <li><Link to='/gallery2'>Gallery Two</Link></li>
          </ul>
        </nav>
        <div className="gallery_photo_gallery">
          {projects.map(project => (
            <div className="grid_item">
              {isVideoOrImage(project)}
              <a className="overlay" href={`/projects/${project.slug}`}>
                <div className="text">
                  <h4>{project.title}</h4>
                  <h5>{project.city}</h5>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
