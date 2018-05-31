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
    const gridItems = document.querySelectorAll('.grid_item')
    const footer = document.querySelector('.Footer')
    const { projects } = AppStore.data

    this.analyzeComponentHeight(galleryDiv, gridItems, footer)
  }
  
  distanceBetweenElements(elementOne, elementTwo) {
    const y1 = elementOne.getBoundingClientRect().bottom
    const y2 = elementTwo.getBoundingClientRect().top

    let topPosElement1 = elementOne.getBoundingClientRect().top + window.scrollY
    let leftPosElement1 = elementOne.getBoundingClientRect().left + window.scrollX
    let topPosFooter = elementOne.getBoundingClientRect().top + window.scrollY
    let leftPosFooter = elementOne.getBoundingClientRect().left + window.scrollX
    let yDistance = topPosFooter - topPosElement1

    console.log(`${elementOne.classList[1]}: ${topPosElement1}`)
    console.log(topPosFooter)
    console.log(`${elementOne.classList[1]} distance from footer: ${yDistance}`)

    return yDistance
  }
  
  analyzeComponentHeight = (galleryDiv, gridItems, footer) => {
    const containerHeight = galleryDiv.clientHeight - 100
    let totalElementsHeight = 0  
    let elements = []

    gridItems.forEach((item, i) =>  {
      totalElementsHeight += item.clientHeight
      item.classList.add(`grid_item_${i}`)
      elements.push(
        {
          index: i,
          height:item.offsetHeight, 
          distanceFromFooter: this.distanceBetweenElements(item, footer)
        }
      )
    })

    const bottomItems = elements.sort((a, b) => a.distanceFromFooter - b.distanceFromFooter)
    bottomItems.length = 3
    console.log(bottomItems)
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
