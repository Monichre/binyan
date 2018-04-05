import React, { Component } from 'react'
import AppDispatcher from '../../Flux/Dispatcher/AppDispatcher'
import AppStore from '../../Flux/Store/AppStore'
import ReactMarkdown from 'react-markdown'
import createAbsoluteGrid from 'react-absolute-grid'
import { ProjectGallery } from './ProjectGallery'
import './project.scss'

const GridItem = props => {
  console.log(props)
  const itemStyle = {
    display: 'block',
    width: '100%',
    height: '100%',
    padding: '30px'
  }
  return (
    <div style={itemStyle} className="gridItem">
      <img src={props.item.file.url} />
    </div>
  )
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
    const items = images.map((image, i) => {
      let _image = { ...image.fields }
      _image.key = i
      _image.sort = i
      _image.filtered = 0
      return _image
    })
    const ProjectGalleryGrid = createAbsoluteGrid(GridItem)
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
            <ProjectGalleryGrid
              items={items}
              dragEnabled={true}
              zoom={1}
              responsive={true}
              verticalMargin={42}
              itemWidth={450}
              itemHeight={409}
            />
          </div>
        </div>
      </div>
    )
  }
}
