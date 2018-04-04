import React from 'react'
import ReactMarkdown from 'react-markdown'

export const ProjectPreview = props => (
  <div className="project_preview">
    <div className="featured_image">
      <img
        src={props.project.featuredImage.fields.file.url}
        alt={props.project.shortDescription}
      />
    </div>
    <div className="preview_content">
      <h2>{props.project.title}</h2>
      <div className="inner">
        <ReactMarkdown source={props.project.shortDescription} />
        {/* <p className="architect">Architect {props.project.architect}</p>
        <p className="location">Location {props.project.address}</p> */}
      </div>
    </div>
  </div>
)
