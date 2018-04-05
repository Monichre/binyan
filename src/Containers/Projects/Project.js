import React, { Component } from 'react'
import AppDispatcher from '../../Flux/Dispatcher/AppDispatcher'
import AppStore from '../../Flux/Store/AppStore'
import ReactMarkdown from 'react-markdown'
import Gallery from 'react-photo-gallery'
import './project.scss'

const Image = (props) => {
  console.log(props)
  return <div className="grid_item"><img src={props.photo.src} /></div>
}

export default class Project extends Component {
  componentWillMount() {
    const { project } = this.props.match.params
    this.getProjectData(project)
  }

  componentDidMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  getProjectData = slug => {
    AppDispatcher.dispatch({
      action: 'get-project-data',
      projectSlug: slug
    })
  }

  render() {
    const { data } = AppStore
    const { currentProject } = data
    const { intro, architect, address, images } = currentProject
    const photoSet = images.map((image, i) => {
      let _image = {
        src: image.fields.file.url,
        width: image.fields.file.details.image.width,
        height: image.fields.file.details.image.height
      }
      return _image
    })
    console.log(photoSet)
    console.log(currentProject)
    
    return (
      <div className="Project">
        <div className="featured_image">
          <img
            src={currentProject.featuredImage.fields.file.url}
            alt={`${currentProject.title} image `}
          />
        </div>
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
                {architect}
              </li>
              <li>
                <h4>Address</h4>
                {address}
              </li>
            </ul>
          </div>
          <div className="project_photo_gallery">
            <Gallery 
              photos={photoSet} 
              margin={4}
              ImageComponent={(props) => <Image {...props} />}
            />
          </div>
        </div>
      </div>
    )
  }
}
