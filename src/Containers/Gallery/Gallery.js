import React, { Component } from 'react'
import AppDispatcher from '../../Flux/Dispatcher/AppDispatcher'
import AppStore from '../../Flux/Store/AppStore'
import ReactMarkdown from 'react-markdown'
import ReactPlayer from 'react-player'
import './gallery.scss'

export default class Gallery extends Component {
  constructor() {
    super()

    this.state = {}
  }
  componentDidMount() {
    const links = document.querySelectorAll('.nav li a')
    const logo = document.querySelector('.nav .logo img')
    logo.src = '/img/logo.png'
    links.forEach(link => {
      link.style.color = 'black'
    })
  }
  render() {
    const { galleryImages } = AppStore.data
    console.log(galleryImages)
    const getCityName = imageFile => {
      if (imageFile.fields.title.includes('New York')) {
        return <h5>New York</h5>
      } else if (imageFile.fields.title.includes('Brisbane')) {
        return <h5>Brisbane</h5>
      } else if (imageFile.fields.title.includes('Dubai')) {
        return <h5>Dubai</h5>
      } else if (imageFile.fields.title.includes('Sydney')) {
        return <h5>Sydney</h5>
      }
    }

    const isVideoOrImage = file =>
      file.fields.file.url.includes('mp4') ||
      file.fields.file.url.includes('video') ? (
        <ReactPlayer
          className="gallery_video"
          url={file.fields.file.url}
          playing
          loop={true}
          muted
          height="100%"
          width="100%"
        />
      ) : (
        <img src={file.fields.file.url} alt={file.fields.title} />
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
    const gallery = shuffle(galleryImages.images)
    return (
      <div className="Gallery">
        <nav className="gallery_menu">
          <ul>
            <li>All</li>
            <li>Still</li>
            <li>Video</li>
            <li>VR</li>
          </ul>
        </nav>
        <div className="gallery_photo_gallery">
          {gallery.map(image => (
            <div className="grid_item">
              {isVideoOrImage(image)}
              <div className="overlay">
                <div className="text">
                  <h4>{image.fields.title}</h4>
                  {getCityName(image)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
