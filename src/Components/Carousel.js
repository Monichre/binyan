import React, { Component } from 'react'
import ReactSwipe from 'react-swipe'

export default class Carousel extends Component {
  render() {
    const { slides } = this.props
    console.log(slides)
    return (
      <ReactSwipe
        className="carousel"
        swipeOptions={{
          continuous: true,
          startSlide: 0,
          speed: 400,
          auto: 3000,
          continuous: true
        }}>
        {slides.map((slide, i) => (
          <div className="slide" key={`hero_slide_${i}`}>
            <img src={slide.image.fields.file.url} alt={slide.title} />
          </div>
        ))}
      </ReactSwipe>
    )
  }
}
