import React from 'react'

export const CarouselNav = props => (
  <nav id="carousel_navigation">
    <ul>
      {props.slides.map((slide, i) => {
        return (
          <li key={`carousel_slide_${i}`}>
            <a href="#" data-number={i} onClick={props.handleClick.bind(this, i)}>
              <span className={`dot ${i === props.active ? 'active' : ''}`} />
            </a>
          </li>
        )
      })}
    </ul>
  </nav>
)