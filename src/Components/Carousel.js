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
            <a href="#" data-number={i} onClick={props.handleClick.bind(this, i)}>
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
    this.state = {
      activeSlides: [],
      slides: []
    }
  }
  handleNavClick = (i, e) => {
    console.log(i)
    console.log(e)
    const newSlide = this.state.slides[i]
    const newActiveSlides = [...this.state.activeSlides]
    console.log(newSlide)
    console.log(newActiveSlides)
    newActiveSlides.push(newSlide)
    this.setState({
      activeSlides: newActiveSlides
    })
    
  }
  componentWillMount() {
    const { slides } = this.props
    this.setState({
      slides: slides,
      activeSlides: [slides[0]]
    })
  }
  componentDidMount() {
    // const { slides } = this.props
    // const newSlides = []
    // setTimeout(() => this.setState({ items: ['item1', 'item2', 'item3', 'item4'] }), 1000)
    // // new item in between
    // setTimeout(() => this.setState({ items: ['item1', 'item2', 'item5', 'item3', 'item4'] }), 2000)
    // // deleted items
    // setTimeout(() => this.setState({ items: ['item1', 'item3', 'item4'] }), 3000)
    // // scrambled order
    // setTimeout(() => this.setState({ items: ['item4', 'item2', 'item3', 'item1'] }), 4000)
  }

  render() {
    const { slides } = this.props
    const { activeSlides } = this.state
    console.log(slides)
    console.log(activeSlides)
    const defaultStyles = {position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', objectFit: 'cover', objectPosition: 'center'}
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
    // zIndex:i,
    // {position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', objectFit: 'cover', objectPosition: 'center'}
    return (
      <div className="carousel">
        <div className="overlay"/>
        <Transition
          native
          keys={activeSlides}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: .3}}>
          {activeSlides.map((slide, i) => (styles) => (
            <animated.img  style={{ ...defaultStyles, ...styles }} src={`${slide.image.fields.file.url}?fl=progressive&w=${winWidth}&h=${winHeight}`} alt={slide.title} />
            
          ))}
        </Transition>
        <Nav handleClick={this.handleNavClick} slides={slides} />
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

