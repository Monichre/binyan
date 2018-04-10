import React, { Component } from 'react'
import ReactSwipe from 'react-swipe'
import './carousel.scss'

const Nav = props => (
  <nav id="carousel_navigation">
    <ul>
      {props.slides.map((slide, i) => {
        return (
          <li key={`carousel_slide_${i}`}>
          <a href="" data-number={i}>
            <span className="dot" />
            <span className="label">Slide</span>
          </a>
        </li>
        )
      })}
    </ul>
  </nav>
)

export default class Carousel extends Component {
  constructor() {
    super()
    this.carousel = {}
  }
  render() {
    const { slides } = this.props
    console.log(slides)

    return (
      <div>
        <ReactSwipe
          className="carousel"
          swipeOptions={{
            continuous: true,
            startSlide: 0,
            speed: 200,
            auto: 3000
          }}>
          {slides.map((slide, i) => (
            <div className="slide" key={`hero_slide_${i}`}>
              <img src={slide.image.fields.file.url} alt={slide.title} />
              <div className="overlay" />
            </div>
          ))}
        </ReactSwipe>
        {/* <Nav slides={slides} /> */}
      </div>
    )
  }
}
