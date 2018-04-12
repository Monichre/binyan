import React, { Component } from 'react'
import ReactSwipe from 'react-swipe'
import { Transition, animated } from 'react-spring'
import './carousel.scss'

const Nav = props => (
  <nav id="carousel_navigation">
    <ul>
      {props.slides.map((slide, i) => {
        return (
          <li key={`carousel_slide_${i}`}>
            <a href="" data-number={i}>
              <span className="dot" />
              <span className="label">{slide.title}</span>
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
    this.state = { toggled: true }
  }
  toggle = e => {
    console.log(e)
    // e.preventDefault()
    this.setState({ toggled: !this.state.toggled })
  }

  render() {
    const { slides } = this.props
    const winHeight = window.outerHeight
    const winWidth = window.outerWidth
    const heroImages = slides.map(slide => (
      <animated.div>
        <img
          src={`${slide.image.fields.file
            .url}?fl=progressive&w=${winWidth}&h=${winHeight}`}
          alt={slide.title}
        />
      </animated.div>
    ))

    return (
      <div className="carousel">
        <Transition
          native
          keys={slides}
          from={{ opacity: 0, height: 0 }}
          enter={{ opacity: 1, height: 100 }}
          leave={{ opacity: 0, height: 0 }}>
          {slides.map((slide, i) => (i) => (
            <animated.div>
              <img
              style={{position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex:i, objectFit: 'cover', objectPosition: 'center'}}
                src={`${slide.image.fields.file.url}?fl=progressive&w=${winWidth}&h=${winHeight}`}
                alt={slide.title}
              />
            </animated.div>
          ))}
        </Transition>
        <Nav slides={slides} />
      </div>
    )
  }
}

// <ReactSwipe
// className="carousel"
// swipeOptions={{
//   continuous: true,
//   startSlide: 0,
//   speed: 200,
//   auto: 3000
// }}>
// {slides.map((slide, i) => (
//   <div className="slide" key={`hero_slide_${i}`}>
//     <img src={`${slide.image.fields.file.url}?fl=progressive&w=${winWidth}&h=${winHeight}`} alt={slide.title} />
//     <div className="overlay" />
//   </div>
// ))}
// </ReactSwipe>

