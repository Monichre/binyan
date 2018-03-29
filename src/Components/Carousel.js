import React, {Component} from 'react'
import ReactSwipe from 'react-swipe'

export default class Carousel extends Component {
    render() {
        const {slides} = this.props
        console.log(slides)
        return (
            <ReactSwipe className="carousel" swipeOptions={{continuous: true}}>
                {slide.map((slide) => (
                    <div className="slide">
                        <img src={slide.image.fields.file.url} alt={slide.title} />
                    </div>
                ))}
            </ReactSwipe>
        );
    }
}