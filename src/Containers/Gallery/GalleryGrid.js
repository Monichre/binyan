import React, {Component} from 'react'
import createAbsoluteGrid from 'AbsoluteGrid'

class Grid extends Component {
  render() {
    return (
      <div>
        Grid
      </div>
    )
  }
}

const AbsoluteGrid = createAbsoluteGrid(<Grid />, {...props})

export default class GalleryGrid extends Component {
  constructor() {
    super()

    this.state = {}
  }
  render () {
    return(
      <div>
        GalleryGrid
      </div>
    )
  }
}