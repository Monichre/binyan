import React, { Component } from 'react'
import ReactSwipe from 'react-swipe'
import ReactPlayer from 'react-player'
import { Transition, animated } from 'react-spring'
import {CarouselNav} from './carouselNav'
import './carousel.scss'

export default class Carousel extends Component {
  constructor() {
    super()
    this.state = {
      slides: [],
      active: 0
    }
    this.current = 0
  }
  handleNavClick = (i, e) => {
    this.setState({
      active: i
    })
  }
  componentWillMount() {
    const { slides } = this.props
    this.setState({
      slides: slides
    })
  }
  componentDidMount() {
    console.log(this)
    const htmlSlides = document.querySelectorAll('.slide')

    this.imageRotation()
  }

  imageRotation = () => {
    const { slides } = this.props
    setInterval(() => {
      const cycle = () => {
        let next = this.current
        next++
        if (next >= slides.length) {
          next = 0
        }
        return next
      }
      this.current = cycle()
      this.setState({ active: this.current })
    }, 5000)
  }
  render() {
    const { slides } = this.props
    const { active } = this.state

    const isVideoOrImage = slide =>
    slide.image.fields.file.url.includes('mp4') ||
    slide.image.fields.file.url.includes('video') ? (
      <ReactPlayer
        className="gallery_video"
        url={slide.image.fields.file.url}
        playing
        loop={true}
        muted
        height="100%"
        width="100%"
      />
    ) : null
    console.log(slides)
    const defaultStyles = { position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }
    const winHeight = window.outerHeight
    const winWidth = window.outerWidth

    return (
      <div className="carousel">
        <Transition
          native
          keys={slides}
          from={{ opacity: 0.3 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0.3 }}
          config={{ tension: 3, friction: 7, delay: 200, duration: 1000, easing: 'ease-in-out' }}>
          {slides.map((slide, i) => styles => (
            <animated.div
              className={`slide slide_${i} ${i === active ? 'active' : ''}`}
              style={{ ...defaultStyles, backgroundImage: `url(${slide.image.fields.file.url.includes('mp4') ? null : slide.image.fields.file.url + '?fm=jpg&fl=progressive'})`}}>
              {isVideoOrImage(slide)}
              <div className="overlay" />
              <div className="slide_info">
                <p>
                  {slide.project.title}, {slide.project.city}
                </p>
                <p>{slide.project.architect}</p>
              </div>
            </animated.div>
          ))}
        </Transition>
        <CarouselNav handleClick={this.handleNavClick} active={active} slides={slides} />
      </div>
    )
  }
}
