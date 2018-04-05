import React from 'react'

export const ProjectGallery = (props) =>  {
  console.log(props)

  return (
    <div className="ProjectGallery">
    {props.items.map((item, i) => {
      return <img key={`projectGalleryImage_${i}`} src={item.fields.file.url} />
    })}
  </div>
  )
}
  

