import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

export const ProjectPreview = props => (
  <div className="project_preview">
    <div className="featured_image">
      <Link to={`/projects/${props.project.slug}`}>
        <img
          src={props.project.featuredImage.fields.file.url}
          alt={props.project.shortDescription}
        />
      </Link>
    </div>
    <div className="preview_content">
      <h2>{props.project.title}</h2>
      <div className="inner">
        <ReactMarkdown source={props.project.shortDescription} />
      </div>
    </div>
  </div>
)
