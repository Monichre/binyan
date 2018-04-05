import React, { Component } from 'react'
import AppDispatcher from '../../Flux/Dispatcher/AppDispatcher'
import AppStore from '../../Flux/Store/AppStore'
import ReactMarkdown from 'react-markdown'
import createAbsoluteGrid from 'react-absolute-grid'
import { ProjectGallery } from './ProjectGallery'
import './project.scss'

const GridItem = props => {
  console.log(props)
  return <img src={props.item.fields.file.url} />
}

export default class Project extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentWillMount() {
    console.log(this.props)
    const { project } = this.props.match.params
    this.getProjectData(project)
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
    console.log(currentProject)
    const { intro, architect, address, images } = currentProject
    const ProjectGalleryGrid = createAbsoluteGrid(GridItem)
    console.log(ProjectGalleryGrid)

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
            <ProjectGalleryGrid items={images} />
          </div>
        </div>
      </div>
    )
  }
}
