import React from 'react'
import ReactMarkdown from 'react-markdown'
import './projects.scss'

export const ProjectPreview = props => (
  <div className="project_preview">
    <div className="hero_image">
      <img
        src={props.project.heroImage.fields.file.url}
        alt={props.project.shortDescription}
      />
    </div>
    <div className="preview_content">
      <h2>{props.project.title}</h2>
      <ReactMarkdown source={props.project.shortDescription} />
      <footer>
        <p><span className="architect">Architect: </span>{props.project.architect}</p>
        <p><span className="location">Location: </span>{props.project.address}</p>
      </footer>
    </div>
  </div>
)
