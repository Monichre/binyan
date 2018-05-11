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

  render() {
    const { projects } = AppStore.data
    console.log(projects)
    
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
    const gallery = shuffle(projects)

    return (
      <div className="Gallery">
        <GeneralHeader />
        <nav className="gallery_menu">
          <ul>
            <li>All</li>
            <li>Still</li>
            <li>Video</li>
            <li>VR</li>
          </ul>
        </nav>
        <div className="gallery_photo_gallery">
          {gallery.map(project => (
            <div className="grid_item">
              {isVideoOrImage(project)}
              <div className="overlay">
                <div className="text">
                  <h4>{project.title}</h4>
                  <h4>{project.city}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
