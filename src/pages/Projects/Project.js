import React, { Component } from 'react'
import AppDispatcher from '../../Flux/Dispatcher/AppDispatcher'
import AppStore from '../../Flux/Store/AppStore'
import ReactMarkdown from 'react-markdown'
import ReactPlayer from 'react-player'
import Lightbox from 'react-images'
import GeneralHeader from '../../components/header/Header'
import './project.scss'

const theme = {
  container: {
    background: 'rgba(255, 255, 255, 0.9)'
  },
  arrow: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fill: '#222',
    opacity: 0.6,
    transition: 'opacity 200ms',

    ':hover': {
      opacity: 1
    }
  },
  arrow__size__medium: {
    borderRadius: 40,
    height: 40,
    marginTop: -20,

    '@media (min-width: 768px)': {
      height: 70,
      padding: 15
    }
  },
  arrow__direction__left: { marginLeft: 10 },
  arrow__direction__right: { marginRight: 10 },
  close: {
    fill: '#D40000',
    opacity: 0.6,
    transition: 'all 200ms',
    ':hover': {
      opacity: 1
    }
  },
  footer: {
    color: 'black'
  },
  footerCount: {
    color: 'rgba(0, 0, 0, 0.6)'
  },
  thumbnail: {},
  thumbnail__active: {
    boxShadow: '0 0 0 2px #00D8FF'
  }
}

export default class Project extends Component {
  constructor() {
    super()
    this.state = {
      currentImage: 0,
      lightboxIsOpen: false,
      photos: []
    }
    this.closeLightbox = this.closeLightbox.bind(this)
    this.goToNext = this.goToNext.bind(this)
    this.goToPrevious = this.goToPrevious.bind(this)
    this.goToImage = this.goToImage.bind(this)
    this.handleClickImage = this.handleClickImage.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
  }

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    })
  }

  openLightbox = (i, e) => {
    console.log(i)
    console.log(e)
    e.preventDefault()
    this.setState({
      currentImage: i,
      lightboxIsOpen: true
    })
  }

  goToNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    })
  }

  goToPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    })
  }

  componentWillMount() {
    const { project } = this.props.match.params
    this.getProjectData(project)
  }

  componentDidMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0

    const { images } = AppStore.data.currentProject
    const photoSet = images.map((image, i) => {
      let _image = {
        src: image.fields.file.url
      }
      return _image
    })
    this.setState({
      photos: photoSet
    })
  }

  getProjectData = slug => {
    AppDispatcher.dispatch({
      action: 'get-project-data',
      projectSlug: slug
    })
  }
  goToImage = index => {
    this.setState({
      currentImage: index
    })
  }
  handleClickImage = () => {
    if (this.state.currentImage === this.props.images.length - 1) return
    this.goToNext()
  }

  render() {
    const { data } = AppStore
    const { currentProject } = data
    const { intro, architect, city, images } = currentProject
    const { photos } = this.state

    const isVideoOrImage = (obj, i) =>
      obj.src.includes('mp4') || obj.src.includes('video') ? (
        <a href={obj.src} className="grid_item" key={i} onClick={this.openLightbox.bind(this, i)}>
          <ReactPlayer className="gallery_video" url={obj.src} playing loop={true} muted height="100%" width="100%" />
        </a>
      ) : (
        <a href={obj.src} className="grid_item" key={i} onClick={this.openLightbox.bind(this, i)}>
          <img src={obj.src} />
        </a>
      )

    const gallery = photos.map((obj, i) => isVideoOrImage(obj, i))

    return (
      <div className="Project">
        <GeneralHeader />
        <div
          className="featured_image"
          style={{ backgroundImage: `url(${currentProject.featuredImage.fields.file.url})` }}
        />
        <div className="project_inner">
          <div className="project_info">
            <h1>{currentProject ? currentProject.title : null}</h1>
            <ul>
              <li>
                <h4>Intro</h4>
                <ReactMarkdown source={intro} />
              </li>
              <li>
                <h4>Architect</h4>
                <p>{architect}</p>
              </li>
              <li>
                <h4>City</h4>
                <p>{city}</p>
              </li>
            </ul>
          </div>
          <div className="project_photo_gallery">
            {gallery}
            <Lightbox
              images={photos}
              backdropClosesModal={true}
              onClose={this.closeLightbox}
              onClickPrev={this.goToPrevious}
              onClickNext={this.goToNext}
              onClickImage={this.handleClickImage}
              onClickThumbnail={this.goToImage}
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
              theme={theme}
            />
          </div>
        </div>
      </div>
    )
  }
}
